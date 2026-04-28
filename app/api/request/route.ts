import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const tel = typeof body.tel === 'string' ? body.tel.trim() : ''
  const budget = typeof body.budget === 'string' ? body.budget.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''

  if (!name || !email || !description) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return NextResponse.json({ error: '서버 설정 오류.' }, { status: 500 })
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
      subject: `[바이너스프레드] 프로젝트 의뢰: ${name}`,
      html: `
        <h2>새 프로젝트 의뢰</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>연락처:</strong> ${tel || '-'}</p>
        <p><strong>예산:</strong> ${budget || '-'}</p>
        <hr />
        <p><strong>내용:</strong></p>
        <p>${description.replace(/\n/g, '<br/>')}</p>
      `,
    })
  } catch {
    return NextResponse.json({ error: '발송 실패. 다시 시도해주세요.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
