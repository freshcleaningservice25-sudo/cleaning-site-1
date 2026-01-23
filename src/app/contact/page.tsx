"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const brand = {
  primary: "#419544",
  primaryDark: "#347737",
  bg: "#FAF8F4",
  text: "#0F172A",
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.bg, color: brand.text }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="w-full px-3 sm:px-4 md:px-6 py-1 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo-crop w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[90px] lg:h-[90px]" aria-label="Go Clean USA home">
            <Image
              src="/logo_2.svg" 
              alt="Go Clean USA Logo" 
              width={90}
              height={90}
              className="object-contain w-full h-full"
            />
          </a>

          {/* Desktop Navigation and CTA */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-16 text-base">
              <a 
                href="/#hero" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#5A8A4F";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#5A8A4F" }}></span>
                </span>
              </a>
              <a 
                href="/#services" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#5A8A4F";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#5A8A4F" }}></span>
                </span>
              </a>
              <a 
                href="/#approach" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#5A8A4F";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Our Approach
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#5A8A4F" }}></span>
                </span>
              </a>
              <a 
                href="/contact" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#5A8A4F";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#5A8A4F" }}></span>
                </span>
              </a>
            </nav>
            
            {/* Social Media & Contact Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="/contact" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#5A8A4F" }}
                aria-label="Call us"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#5A8A4F" }}
                aria-label="Email us"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/people/Go-Clean-Chicago/61584054026967/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#5A8A4F" }}
                aria-label="Follow Go Clean Chicago on Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/goclean.chicago?igsh=cjZ1dTVuamExOGRq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#5A8A4F" }}
                aria-label="Follow Go Clean Chicago on Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#5A8A4F" }}
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
            
            <a 
              href="/book" 
              className="inline-flex items-center px-8 py-3.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex-shrink-0" 
              style={{ backgroundColor: "#5A8A4F", fontSize: "15px", letterSpacing: "0.01em" }}
              onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#347737")} 
              onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#5A8A4F")}
            >
              Book Cleaning
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
            style={{ backgroundColor: "#5A8A4F" }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FAF8F4" }}>
            <nav className="flex flex-col px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
              <a 
                href="/#hero" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                About Us
              </a>
              <a 
                href="/#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                Services
              </a>
              <a 
                href="/#approach" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                Our Approach
              </a>
              <a 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                Contact
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "#5A8A4F" }}
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "#5A8A4F" }}
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "#5A8A4F" }}
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
              <a 
                href="/book" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all"
                style={{ backgroundColor: "#5A8A4F" }}
              >
                Book Cleaning
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mb-10 sm:mb-12 text-center">
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: brand.primary }}>
            We are here to help
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3" style={{ color: brand.text }}>
            Contact Go Clean USA
          </h1>
          <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Tell us what you need. A member of our team will reach out as soon as possible to confirm details and schedule your cleaning.
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4 lg:col-span-1" style={{ borderColor: "#E2E8F0" }}>
            <h2 className="text-xl font-semibold" style={{ color: brand.text }}>Call or Email</h2>
            <div className="space-y-3 text-base" style={{ color: "#1F2937" }}>
              <div>
                <p className="text-sm uppercase tracking-wide" style={{ color: "#6B7280" }}>Phone</p>
                <p className="font-semibold">917-385-2100</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide" style={{ color: "#6B7280" }}>Email</p>
                <p className="font-semibold">Contact@gocleanusa.com</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide" style={{ color: "#6B7280" }}>Address</p>
                <p className="font-semibold">4011A N Lowell Ave 1A-W<br />Chicago, 60641</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide" style={{ color: "#6B7280" }}>Hours</p>
                <p className="font-semibold">Mon-Sat: 7:30am-9pm</p>
                <p className="font-semibold">Sun: 9am-6pm</p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm" style={{ color: "#475569" }}>
                Prefer booking? You can also schedule directly on our booking page.
              </p>
              <a
                href="/book"
                className="inline-flex mt-3 px-4 py-2 rounded-lg text-white font-semibold shadow-sm transition-colors"
                style={{ backgroundColor: brand.primary }}
              >
                Book Cleaning
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 space-y-4" style={{ borderColor: "#E2E8F0" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: brand.text }}>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2"
                    style={{ borderColor: "#E2E8F0" }}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: brand.text }}>Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2"
                    style={{ borderColor: "#E2E8F0" }}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: brand.text }}>Phone</label>
                  <input
                    required
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2"
                    style={{ borderColor: "#E2E8F0" }}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: brand.text }}>How can we help?</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2"
                  style={{ borderColor: "#E2E8F0" }}
                  placeholder="Share details about your space, timing, and preferences."
                />
              </div>

              {error && (
                <div className="rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "#F87171", color: "#B91C1C", backgroundColor: "#FEF2F2" }}>
                  {error}
                </div>
              )}
              {status === "success" && (
                <div className="rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "#34D399", color: "#065F46", backgroundColor: "#ECFDF3" }}>
                  Thanks! Your request has been sent. We will contact you shortly.
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <p className="text-sm" style={{ color: "#475569" }}>
                  We respond within business hours. For urgent needs, call the number above.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-colors disabled:opacity-80"
                  style={{ backgroundColor: brand.primary }}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <div className="bg-white rounded-2xl shadow-sm border" style={{ borderColor: "#E2E8F0" }}>
            <div className="bg-gray-800 px-4 py-3 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg">Go Clean USA</span>
                  <span className="text-gray-300 text-xs">Chicago, IL</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: brand.primary }}>
                Serving Chicago & Suburbs
              </div>
            </div>
            <div className="w-full h-96 rounded-b-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380510.6741687111!2d-88.01214780859376!3d41.83364702139266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Go Clean USA Serving Area"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: "#347737" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-6 sm:gap-8">
            {/* Logo Section */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-md overflow-hidden">
                  <Image 
                    src="/logo_2.svg" 
                    alt="Go Clean USA Logo" 
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl uppercase">Go Clean USA</span>
              <span className="text-white text-xs sm:text-sm uppercase mt-1">Cleaning Services</span>
              <div className="mt-4 text-white text-sm space-y-1">
                <p>917-385-2100</p>
                <p>Contact@gocleanusa.com</p>
                <p>4011A N Lowell Ave 1A-W</p>
                <p>Chicago, 60641</p>
              </div>
            </div>

            {/* Services and Links Section */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-16">
              {/* Services Column */}
              <div className="flex flex-col">
                <h3 className="text-white font-semibold uppercase mb-4 text-sm">SERVICES</h3>
                <div className="flex flex-col gap-2">
                  <a href="/#services" className="text-white hover:opacity-80 transition-opacity text-sm">Residential Cleaning</a>
                  <a href="/#services" className="text-white hover:opacity-80 transition-opacity text-sm">Office & Commercial</a>
                  <a href="/#services" className="text-white hover:opacity-80 transition-opacity text-sm">Airbnb Turnovers</a>
                  <a href="/#services" className="text-white hover:opacity-80 transition-opacity text-sm">Move In/Out Cleaning</a>
                </div>
              </div>

              {/* Links Column */}
              <div className="flex flex-col gap-2">
                <a href="#" className="text-white hover:opacity-80 transition-opacity text-sm">Privacy Policy</a>
                <a href="#" className="text-white hover:opacity-80 transition-opacity text-sm">Terms of Service</a>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t mb-6" style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}></div>

          {/* Bottom Section */}
          <div className="flex flex-row items-center">
            <p className="text-white text-sm">© {new Date().getFullYear()} Go Clean USA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
