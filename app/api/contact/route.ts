import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const budget = typeof body.budget === 'string' ? body.budget.trim() : ''
  const categories = Array.isArray(body.categories) ? body.categories.join(', ') : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''

  if (!name || !email || !description) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"바이너스프레드" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[바이너스프레드] New Project Inquiry: ${name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>Budget:</strong> ${budget || '-'}</p>
        <p><strong>Categories:</strong> ${categories || '-'}</p>
        <hr />
        <p><strong>Project Details:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
