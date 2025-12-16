"use client";

import Image from "next/image";
import { useState } from "react";

export default function GoCleanWelcomeFinalBranded() {
  const brand = { primary: "#0C5E3E", primaryDark: "#09402A", accent: "#2BBE87", bg: "#FAF8F4", text: "#0F172A" };
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const faqs = [
    {
      question: "What's the difference between Standard and Deep Cleaning?",
      answer: "Standard Cleaning covers regular maintenance — dusting, vacuuming, mopping, bathrooms, and kitchen surfaces. Deep Cleaning includes extra detailing: baseboards, inside appliances, doors, vents, and areas behind furniture."
    },
    {
      question: "What's the difference between Organic and Regular cleaning products?",
      answer: "We offer both options: Organic Cleaning uses plant-based, biodegradable, pet & child safe products. Regular Cleaning uses professional-grade products for heavy-duty tasks. You can choose either or let us mix both as needed."
    },
    {
      question: "Do I need to provide cleaning supplies or equipment?",
      answer: "No need — we bring everything ourselves. We use our own professional tools, vacuums, mops, and organic products. If you have your favorite products or want us to use yours — no problem, we can do it your way."
    },
    {
      question: "How long will the cleaning take?",
      answer: "It depends on the size and condition of your home: 1 bed / 1 bath — about 2–3 hours, 2 bed / 1 bath — about 3–4 hours, 3 bed / 2 bath — about 4–5 hours. Times may vary depending on cleaning type and number of cleaners."
    },
    {
      question: "How do I get an estimate or book a cleaning?",
      answer: "You can: Click \"Book Cleaning\" on our website, text or call us at 917-385-2100, or request a quote via our online form."
    },
    {
      question: "How do payments work?",
      answer: "We accept Zelle, Venmo, Cash, and Card. Payment is due after cleaning is completed."
    },
    {
      question: "Are your products safe for pets and kids?",
      answer: "Yes! Our organic line is made from natural, non-toxic ingredients — perfect for families with kids or pets."
    },
    {
      question: "Do you clean Airbnbs or offices?",
      answer: "Absolutely. We specialize in Residential, Commercial, and Airbnb turnover cleaning — including linens, restocking, and photo-ready finishing."
    },
    {
      question: "What if I'm not home during cleaning?",
      answer: "No problem! Just leave us instructions on how to access your home (door code, key, or concierge). We'll lock up securely when done."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Before/After work examples - update with your actual image paths
  // Format: { before: "/our works/before1.jpg", after: "/our works/after1.jpg", type: "stacked" | "split" }
  const workExamples = [
    {
      before: "/our works/photo_2025-11-12 15.25.45.jpeg",
      after: "/our works/photo_2025-11-12 15.25.48.jpeg",
      type: "split" // or "stacked" for top-bottom
    },
    {
      before: "/our works/photo_2025-11-12 15.25.53.jpeg",
      after: "/our works/photo_2025-11-12 15.25.55.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.25.58.jpeg",
      after: "/our works/photo_2025-11-12 15.26.01.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.04.jpeg",
      after: "/our works/photo_2025-11-12 15.26.13.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.15.jpeg",
      after: "/our works/photo_2025-11-12 15.26.18.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.22.jpeg",
      after: "/our works/photo_2025-11-12 15.26.24.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.29.jpeg",
      after: "/our works/photo_2025-11-12 15.26.31.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.34.jpeg",
      after: "/our works/photo_2025-11-12 15.26.36.jpeg",
      type: "split"
    },
    {
      before: "/our works/photo_2025-11-12 15.26.38.jpeg",
      after: "/our works/photo_2025-11-12 15.26.43.jpeg",
      type: "split"
    }
  ];

  const nextWork = () => {
    setCurrentWorkIndex((prev) => (prev + 1) % workExamples.length);
  };

  const prevWork = () => {
    setCurrentWorkIndex((prev) => (prev - 1 + workExamples.length) % workExamples.length);
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF8F4", color: brand.text }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="w-full px-6 py-1 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo-crop" aria-label="Go Clean USA home">
            <Image
              src="/logo_2.svg" 
              alt="Go Clean USA Logo" 
              width={90}
              height={90}
              className="object-contain"
            />
          </a>

          {/* Desktop Navigation and CTA */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-16 text-base">
              <a 
                href="#hero" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#0C5E3E";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#0C5E3E" }}></span>
                </span>
              </a>
              <a 
                href="#services" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#0C5E3E";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#0C5E3E" }}></span>
                </span>
              </a>
              <a 
                href="#approach" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#0C5E3E";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Our Approach
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#0C5E3E" }}></span>
                </span>
              </a>
              <a 
                href="/contact" 
                className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                style={{ color: "#1F2937" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#0C5E3E";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#1F2937";
                }}
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#0C5E3E" }}></span>
                </span>
              </a>
            </nav>
            
            {/* Social Media & Contact Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="/contact" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#0C5E3E" }}
                aria-label="Call us"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                style={{ backgroundColor: "#0C5E3E" }}
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
                style={{ backgroundColor: "#0C5E3E" }}
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
                style={{ backgroundColor: "#0C5E3E" }}
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
                style={{ backgroundColor: "#0C5E3E" }}
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
              style={{ backgroundColor: "#0C5E3E", fontSize: "15px", letterSpacing: "0.01em" }}
              onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#0A4C32")} 
              onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#0C5E3E")}
            >
              Book Cleaning
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
            style={{ backgroundColor: "#0C5E3E" }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FAF8F4" }}>
            <nav className="flex flex-col px-4 py-4 space-y-4">
              <a 
                href="#hero" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                About Us
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold uppercase tracking-wide py-2 transition-colors"
                style={{ color: "#1F2937" }}
              >
                Services
              </a>
              <a 
                href="#approach" 
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
                  style={{ backgroundColor: "#0C5E3E" }}
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "#0C5E3E" }}
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
                  style={{ backgroundColor: "#0C5E3E" }}
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
                style={{ backgroundColor: "#0C5E3E" }}
              >
                Book Cleaning
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="border-b" style={{ paddingTop: '140px' }}>
        <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-3" style={{ color: "#0C5E3E", letterSpacing: "-0.02em" }}>Go Clean USA</h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 md:mb-8 px-4" style={{ color: "#0F172A", letterSpacing: "-0.01em" }}>Chicago&apos;s Custom Cleaning: Organic-Safe, Professionally Done.</p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4" style={{ color: "#475569", lineHeight: "1.7", maxWidth: "500px" }}>
              Stop worrying about cleaning schedules. We are a family-owned team providing custom solutions—from gentle, plant-based products to powerful deep-clean techniques. Your satisfaction is 100% guaranteed, or we re-clean for free.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center w-full sm:w-auto px-4">
              <a 
                href="/book" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-center" 
                style={{ backgroundColor: "#0C5E3E", fontSize: "14px sm:text-base" }}
                onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#09402A")} 
                onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#0C5E3E")}
              >
                Book Cleaning
              </a>
              <a 
                href="#approach" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 font-semibold transition-all duration-200 hover:bg-green-50 text-center" 
                style={{ borderColor: "#0C5E3E", color: "#0C5E3E", fontSize: "14px sm:text-base" }}
              >
                Our Approach
              </a>
            </div>
            <p className="text-xs sm:text-sm font-medium tracking-wide px-4" style={{ color: "#64748B", letterSpacing: "0.025em" }}>Serving Chicago & suburbs • Licensed, Insured & Background-Checked Cleaners</p>
          </div>
          <div className="relative w-full lg:w-1/2 flex items-center justify-center mt-4 lg:mt-0">
            <div className="w-full max-w-md rounded-3xl overflow-hidden">
              <Image 
                src="/clean-hero2.jpeg" 
                alt="Professional cleaning service" 
                width={600}
                height={740}
                className="w-full h-auto object-contain"
                style={{ border: 'none', outline: 'none' }}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-6 sm:mb-8 md:mb-12" style={{ color: "#0F172A" }}>Our Services</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {[
              {title:'Stress-Free Residential Cleaning', description:'Reclaim your home with regular, deep, or move-out services for apartments, condos, and family homes.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )},
              {title:'Office & Commercial Space Sanitation', description:'Maintain a clean, professional environment for offices, studios, salons, and small businesses.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )},
              {title:'Fast, 5-Star Airbnb Turnovers', description:'Ensure 5-star reviews with fast, detailed cleaning, linen service, and essential restocking.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )},
              {title:'Total Move In/Out Restoration', description:'Full cleaning and restoration, including appliances, cabinets, baseboards, and beyond, for guaranteed deposit return.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              )},
            ].map((s,i)=> (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>{s.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "#64748B" }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic or Regular Section */}
      <section className="border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="rounded-xl overflow-hidden order-1 lg:order-1 w-full">
              <Image 
                src="/your%20choice.jpeg" 
                alt="Organic or regular cleaning options illustration" 
                width={900}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="order-2 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: "#0F172A" }}>You Choose The Care: Organic-Safe or Pro-Grade Power.</h2>
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: "#475569", lineHeight: "1.7" }}>
                We believe cleaning should never be &quot;one-size-fits-all.&quot; We provide honest flexibility, allowing you to choose the right solution for your family, pets, and home surfaces. Both options are safe, effective, and tailored to your approval.
              </p>
              <ul className="space-y-3">
                {[
                  "Certified Organic-Safe: Non-toxic, plant-based products for a clean, chemical-free home.",
                  "Pro-Grade Power: Stronger, professional-grade cleaners for deep sanitation and heavy-duty jobs.",
                  "Guaranteed Pet & Kid Safety: Always safe for your children and furry friends.",
                  "Your Approval First: We only use stronger products with your explicit prior approval and responsibility."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-0.5">✓</span>
                    <span className="text-base" style={{ color: "#475569" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12" style={{ color: "#0F172A" }}>Why Chicago Clients Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {text: "Local family team — not a big platform", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )},
              {text: "Organic or regular cleaning — your choice", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              {text: "We bring our own supplies & equipment", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 4h7v16H2V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 4h7M2 20h7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 8h6v10h-6V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 8h6M13 18h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 6h2v2h-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 5l2-1" />
                </svg>
              )},
              {text: "2 cleaners available for faster cleaning", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )},
              {text: "Experienced with Residential, Commercial, and Airbnb", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )},
              {text: "Clear pricing, no surprises", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#0C5E3E" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border shadow-sm text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="text-base font-medium" style={{ color: "#0F172A" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-b" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 px-4" style={{ color: "#0F172A" }}>BOOK NOW & SECURE YOUR SPOT</h2>
          <p className="text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-4" style={{ color: "#475569" }}>
            Transparency is key. If your home requires stronger solutions for sanitation, we will always notify you and obtain your approval first before using them responsibly and safely.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-6 sm:mb-8">
            {[
              { price: "$139", size: "1 bed / 1 bath" },
              { price: "$169", size: "2 bed / 1 bath" },
              { price: "$219", size: "3 bed / 2 bath" }
            ].map((tier, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 text-center border border-gray-200">
                <p className="text-xs sm:text-sm mb-2" style={{ color: "#64748B" }}>from</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3" style={{ color: "#0F172A" }}>{tier.price}</p>
                <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: "#475569" }}>{tier.size}</p>
                <a
                  href="/book"
                  className="w-full inline-block px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center text-sm sm:text-base"
                  style={{ backgroundColor: "#0C5E3E" }}
                  onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#09402A")} 
                  onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#0C5E3E")}
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-center max-w-2xl mx-auto px-4" style={{ color: "#64748B" }}>
            Not every home can be cleaned 100% with organic-only products — and that&apos;s okay. If your space needs stronger solutions, we&apos;ll let you know first and use them safely.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-b" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-6 sm:mb-8" style={{ color: "#0F172A" }}>Our Approach</h2>
          <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 px-4">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" style={{ color: "#334155", lineHeight: "1.7" }}>
              As a local, family-owned business in Chicago, we know that no two homes are the same. What works for one family may not work for another. That&apos;s why we give you the power to choose and take an honest, responsible approach to your home&apos;s cleanliness.
            </p>
            <p className="text-base sm:text-lg font-semibold mb-6 sm:mb-8" style={{ color: "#0F172A", lineHeight: "1.7" }}>
              Choose the level of care that your home needs:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
            <div className="rounded-xl border p-6 bg-white text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌿</span>
                <p className="text-sm font-semibold" style={{ color: "#0C5E3E" }}>1. Organic-Safe Clean</p>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>The safest choice for your family</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                We use our trusted, non-toxic, plant-based solutions and supplies. Perfect for homes with infants, small children, expectant mothers, allergy sufferers, or pets. Cleanliness without compromising health.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-white text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🛠️</span>
                <p className="text-sm font-semibold" style={{ color: "#0C5E3E" }}>2. Pro-Grade Power</p>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>For the toughest cleaning challenges</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                When maximum disinfection is required (e.g., post-construction, move-in/out, commercial spaces). We utilize powerful, EPA-registered professional solutions, only with your explicit prior approval.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center px-4">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium" style={{ color: "#334155", lineHeight: "1.7" }}>
              It&apos;s More Than Just Cleaning: We help Chicago families live healthier and happier lives by creating a clean, comfortable, and welcoming space you love coming home to.
            </p>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>OUR WORKS</h2>
          </div>
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevWork}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ color: "#0C5E3E" }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextWork}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ color: "#0C5E3E" }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Content */}
            <div className="mx-8 sm:mx-12 md:mx-16">
              {workExamples.map((work, index) => (
                <div
                  key={index}
                  className={`${index === currentWorkIndex ? "block" : "hidden"}`}
                >
                  {work.type === "stacked" ? (
                    // Stacked layout (before on top, after on bottom)
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative w-full rounded-lg overflow-visible shadow-md bg-gray-100">
                        <div className="relative w-full flex items-center justify-center p-4">
                          <Image
                            src={work.before}
                            alt="Before cleaning"
                            width={1200}
                            height={800}
                            className="w-full h-auto max-w-full object-contain rounded-lg"
                            unoptimized
                />
              </div>
                </div>
                      <div className="relative w-full rounded-lg overflow-visible shadow-md bg-gray-100">
                        <div className="relative w-full flex items-center justify-center p-4">
                          <Image
                            src={work.after}
                            alt="After cleaning"
                            width={1200}
                            height={800}
                            className="w-full h-auto max-w-full object-contain rounded-lg"
                            unoptimized
                  />
                </div>
              </div>
                    </div>
                  ) : (
                    // Split layout (before on left, after on right)
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative w-full rounded-lg overflow-visible shadow-md bg-gray-100">
                        <div className="relative w-full flex items-center justify-center p-4">
                          <Image
                            src={work.before}
                            alt="Before cleaning"
                            width={800}
                            height={1000}
                            className="w-full h-auto max-w-full object-contain rounded-lg"
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="relative w-full rounded-lg overflow-visible shadow-md bg-gray-100">
                        <div className="relative w-full flex items-center justify-center p-4">
                          <Image
                            src={work.after}
                            alt="After cleaning"
                            width={800}
                            height={1000}
                            className="w-full h-auto max-w-full object-contain rounded-lg"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {workExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWorkIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentWorkIndex ? "bg-green-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
                </div>
              </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>What Our Customers Say</h2>
            <p className="text-sm sm:text-base md:text-lg px-4" style={{ color: "#64748B" }}>Real reviews from satisfied clients across Chicago</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#E2E8F0" }}>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#FBBF24" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#0F172A" }}>
                  I scheduled an organic cleaning with GoCleanUSA and couldn&apos;t be happier! The team arrived on time, brought their own organic supplies, and made my apartment sparkle without any harsh smells. I love that they care about the environment while still providing an amazing clean. Highly recommend!
                </p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
                <p className="font-semibold text-base" style={{ color: "#0F172A" }}>Sarah L.</p>
                <p className="text-sm" style={{ color: "#64748B" }}>60647, Chicago</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#E2E8F0" }}>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#FBBF24" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#0F172A" }}>
                  I booked a deep cleaning after moving out and they did a fantastic job. Every surface was spotless, and they even got into places I didn&apos;t think could be cleaned. Communication was great, and the price was very reasonable. I&apos;ll definitely be using their regular cleaning service.
                </p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
                <p className="font-semibold text-base" style={{ color: "#0F172A" }}>Michael R.</p>
                <p className="text-sm" style={{ color: "#64748B" }}>60618, Chicago</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#E2E8F0" }}>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#FBBF24" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#0F172A" }}>
                  We&apos;ve been using GoCleanUSA&apos;s regular cleaning for months and it&apos;s always consistent and professional. The organic products leave our home fresh and chemical-free — perfect since we have pets and small kids. The cleaners are always polite and trustworthy.
                </p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
                <p className="font-semibold text-base" style={{ color: "#0F172A" }}>Emily K.</p>
                <p className="text-sm" style={{ color: "#64748B" }}>60622, Chicago</p>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "#E2E8F0" }}>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#FBBF24" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#0F172A" }}>
                  Booked a last-minute cleaning before a family visit and they squeezed me in! The cleaners worked quickly but thoroughly. The organic option made the house smell clean without any strong chemicals. Excellent customer service from start to finish.
                </p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
                <p className="font-semibold text-base" style={{ color: "#0F172A" }}>James P.</p>
                <p className="text-sm" style={{ color: "#64748B" }}>60614, Chicago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>FAQ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-b transition-all"
                style={{
                  borderColor: "#E2E8F0"
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative w-full px-0 py-4 flex items-center justify-center text-center hover:opacity-80 transition-opacity"
                >
                  <span className="text-base font-medium" style={{ color: "#0F172A" }}>
                    {faq.question}
                  </span>
                  <span className="absolute right-2 sm:right-3 text-2xl font-light" style={{ color: "#0F172A" }}>
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="pb-4 px-4 sm:px-6 text-center">
                    <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                      {faq.answer}
                    </p>
              </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: "#0A4C32" }}>
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
                  <a href="#services" className="text-white hover:opacity-80 transition-opacity text-sm">Residential Cleaning</a>
                  <a href="#services" className="text-white hover:opacity-80 transition-opacity text-sm">Office & Commercial</a>
                  <a href="#services" className="text-white hover:opacity-80 transition-opacity text-sm">Airbnb Turnovers</a>
                  <a href="#services" className="text-white hover:opacity-80 transition-opacity text-sm">Move In/Out Cleaning</a>
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
