"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

const budgetOptions = [
  "Under ₩1,000,000",
  "₩1M – ₩10M",
  "₩10M – ₩30M",
  "₩30M+",
];

const categoryOptions = [
  "Website",
  "Responsive Web",
  "Mobile Web",
  "Mobile App",
  "Branding",
  "Character Design",
  "Print & Editorial",
  "Other",
];

export default function ContactPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Website"]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      categories: selectedCategories,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-page-padding">
        <div className="text-center">
          <h2 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter mb-[40px]">
            THANK YOU.
          </h2>
          <p className="text-[17px] tracking-[-0.3px] leading-[1.4] text-mine-shaft/60 mb-[40px]">
            Your request has been received. We&apos;ll be in touch soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[13px] tracking-[0.1em] uppercase border-b border-mine-shaft pb-[2px] hover:opacity-50 transition-opacity"
          >
            Send Another Request
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <PageHeader
        breadcrumb="Contact"
        title={<>Begin a New <span className="font-bold">Experience</span></>}
        description={
          <>
            <span className="block">당신의 아이디어가 더 가치 있는 경험으로 이어질 수 있도록,</span>
            <span className="block mt-[4px]">바이너스프레드가 함께 고민하고 제안합니다.</span>
          </>
        }
      />

      {/* ── Form ── */}
      <section className="px-page-padding py-[80px]">
        <form onSubmit={handleSubmit} className="max-w-[1200px]">

          {/* Row 1: Company + Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[48px] mb-[48px]">
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Company
              </label>
              <input
                name="company"
                type="text"
                placeholder="Company name"
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft placeholder:text-mine-shaft/20 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Name <span className="text-mine-shaft">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft placeholder:text-mine-shaft/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[48px] mb-[48px]">
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Phone <span className="text-mine-shaft">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="010-0000-0000"
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft placeholder:text-mine-shaft/20 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Email <span className="text-mine-shaft">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="hello@company.com"
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft placeholder:text-mine-shaft/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Budget + File */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[48px] mb-[64px]">
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Budget <span className="text-mine-shaft">*</span>
              </label>
              <select
                name="budget"
                required
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select budget range</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Attachment
              </label>
              <input
                name="file"
                type="file"
                className="bg-transparent text-[15px] text-mine-shaft/60 focus:outline-none file:mr-4 file:py-1 file:px-3 file:border file:border-alto file:text-[12px] file:tracking-[0.08em] file:uppercase file:bg-transparent file:text-mine-shaft file:cursor-pointer hover:file:border-mine-shaft file:transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-[64px]">
            <p className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter mb-[20px]">
              Category <span className="text-mine-shaft">*</span>
            </p>
            <div className="flex flex-wrap gap-[8px]">
              {categoryOptions.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-[18px] py-[8px] text-[13px] tracking-[0.05em] uppercase border transition-colors ${
                      active
                        ? "bg-mine-shaft text-gallery border-mine-shaft"
                        : "bg-transparent text-mine-shaft border-alto hover:border-mine-shaft"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-[64px]">
            <div className="flex flex-col gap-[12px] border-b border-alto pb-[12px] focus-within:border-mine-shaft transition-colors">
              <label className="text-[12px] tracking-[0.08em] uppercase text-mine-shaft/50 font-inter">
                Project Details <span className="text-mine-shaft">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="bg-transparent text-[20px] tracking-[-0.5px] text-mine-shaft placeholder:text-mine-shaft/20 focus:outline-none resize-none leading-[1.4]"
              />
            </div>
          </div>

          {/* Legal */}
          <p className="text-[13px] text-mine-shaft/40 leading-[1.5] mb-[48px]">
            Your request will be sent directly to our team via email. No information is stored on our servers.
          </p>

          {/* Submit */}
          {status === "error" && (
            <p className="text-[13px] text-red-500 mb-[24px]">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group flex items-center gap-[16px] disabled:opacity-40"
          >
            <span className="text-[13px] tracking-[0.1em] uppercase font-inter border-b border-mine-shaft pb-[2px] group-hover:opacity-50 transition-opacity">
              {status === "sending" ? "Sending..." : "Submit Request"}
            </span>
            <span className="text-[20px] group-hover:translate-x-1 transition-transform">→</span>
          </button>

        </form>
      </section>
    </main>
  );
}
