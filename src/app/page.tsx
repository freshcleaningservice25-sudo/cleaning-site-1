"use client";

import Image from "next/image";
import { useState } from "react";

export default function GoCleanWelcomeFinalBranded() {
  const brand = { primary: "#0E4B3D", primaryDark: "#0A3A2F", accent: "#2BBE87", bg: "#FAF8F4", text: "#0F172A" };
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

  const faqs = [
    {
      question: "What's the difference between Standard and Deep Cleaning?",
      answer: "Standard Cleaning covers regular maintenance — dusting, vacuuming, mopping, bathrooms, and kitchen surfaces. Deep Cleaning includes extra detailing: baseboards, inside appliances, doors, vents, and areas behind furniture."
    },
    {
      question: "What's the difference between Eco and Regular cleaning products?",
      answer: "We offer both options: Eco Cleaning uses plant-based, biodegradable, pet & child safe products. Regular Cleaning uses professional-grade products for heavy-duty tasks. You can choose either or let us mix both as needed."
    },
    {
      question: "Do I need to provide cleaning supplies or equipment?",
      answer: "No need — we bring everything ourselves. We use our own professional tools, vacuums, mops, and eco-friendly products. If you have your favorite products or want us to use yours — no problem, we can do it your way."
    },
    {
      question: "How long will the cleaning take?",
      answer: "It depends on the size and condition of your home: 1 bed / 1 bath — about 2–3 hours, 2 bed / 1 bath — about 3–4 hours, 3 bed / 2 bath — about 4–5 hours. Times may vary depending on cleaning type and number of cleaners."
    },
    {
      question: "How do I get an estimate or book a cleaning?",
      answer: "You can: Click \"Book Cleaning\" on our website, text or call us at (773) 397-7380, or request a quote via our online form."
    },
    {
      question: "How do payments work?",
      answer: "We accept Zelle, Venmo, Cash, and Card. Payment is due after cleaning is completed."
    },
    {
      question: "Are your products safe for pets and kids?",
      answer: "Yes! Our eco line is made from natural, non-toxic ingredients — perfect for families with kids or pets."
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
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F4", color: brand.text, minWidth: '1200px' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm border-b shadow-sm" style={{ backgroundColor: "#FAF8F4", borderColor: "#E5E7EB" }}>
        <div className="w-full px-4 py-4 flex items-center justify-between" style={{ maxWidth: '100%' }}>
          <div className="flex items-center gap-3">
            <div className="h-28 w-28 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Go Clean USA Logo" 
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight leading-tight mb-0.5" style={{ color: "#0F172A" }}>Go Clean USA</p>
              <p className="text-sm font-semibold leading-tight" style={{ color: "#4CAF50" }}>Because clean feels better.</p>
            </div>
          </div>
          <div className="flex items-center gap-14">
            <nav className="flex items-center gap-14 text-base">
              <a 
                href="#hero" 
                className="font-semibold transition-all duration-200 relative py-2 group" 
                style={{ color: "#374151" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#4CAF50";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#374151";
                }}
              >
                <span className="relative">
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#4CAF50" }}></span>
                </span>
              </a>
              <a 
                href="#services" 
                className="font-semibold transition-all duration-200 relative py-2 group" 
                style={{ color: "#374151" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#4CAF50";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#374151";
                }}
              >
                <span className="relative">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#4CAF50" }}></span>
                </span>
              </a>
              <a 
                href="#approach" 
                className="font-semibold transition-all duration-200 relative py-2 group" 
                style={{ color: "#374151" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#4CAF50";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#374151";
                }}
              >
                <span className="relative">
                  Our Approach
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#4CAF50" }}></span>
                </span>
              </a>
              <a 
                href="#contact" 
                className="font-semibold transition-all duration-200 relative py-2 group" 
                style={{ color: "#374151" }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#4CAF50";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#374151";
                }}
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#4CAF50" }}></span>
                </span>
              </a>
          </nav>
            <a 
              href="/book" 
              className="inline-flex items-center px-7 py-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex-shrink-0" 
              style={{ backgroundColor: "#4CAF50", fontSize: "16px" }}
              onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} 
              onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}
            >
              Book Cleaning
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="border-b">
        <div className="w-full py-20 flex flex-row gap-8 items-center">
          <div className="w-1/2 flex flex-col justify-center items-center text-center">
            <h1 className="text-6xl font-extrabold tracking-tight leading-[1.1] mb-3" style={{ color: "#4CAF50", letterSpacing: "-0.02em" }}>Go Clean USA</h1>
            <p className="text-xl font-semibold mb-8" style={{ color: "#0F172A", letterSpacing: "-0.01em" }}>Because clean feels better.</p>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "#475569", lineHeight: "1.7", maxWidth: "90%" }}>
              We&apos;re a Chicago-based, family-run cleaning team offering both eco-friendly and professional-grade cleaning solutions. Whether you prefer gentle, plant-based products or stronger commercial cleaners, we deliver the same quality, care, and professionalism every time.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
                style={{ backgroundColor: "#4CAF50", fontSize: "16px" }}
                onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} 
                onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}
              >
                Book Cleaning
              </a>
              <a 
                href="#approach" 
                className="px-8 py-4 rounded-2xl border-2 font-semibold transition-all duration-200 hover:bg-green-50" 
                style={{ borderColor: "#4CAF50", color: "#4CAF50", fontSize: "16px" }}
              >
                Our Approach
              </a>
            </div>
            <p className="text-sm font-medium tracking-wide" style={{ color: "#64748B", letterSpacing: "0.025em" }}>Serving Chicago & suburbs • Residential • Commercial • Airbnb</p>
          </div>
          <div className="relative w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden">
              <Image 
                src="/clean-hero-removebg-preview.png" 
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
        <div className="max-w-full mx-auto px-0 py-16">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12" style={{ color: "#0F172A" }}>Our Services</h2>
          <div className="grid gap-6 grid-cols-4 max-w-7xl mx-auto px-8">
            {[
              {title:'Residential Cleaning', description:'Apartments, condos and family homes. Regular, deep or move-out.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )},
              {title:'Commercial Cleaning', description:'Offices, studios, salons, and small businesses.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )},
              {title:'Airbnb Turnovers', description:'Fast, detailed cleaning with linens and restocking.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )},
              {title:'Move In / Move Out', description:'Inside appliances, cabinets, baseboards and more.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
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

      {/* Eco or Regular Section */}
      <section className="border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: "#0F172A" }}>Eco or Regular — Your Choice</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#475569", lineHeight: "1.7" }}>
                We believe in honesty and flexibility. Some homes prefer gentle, plant-based cleaners; others need stronger, professional products for heavy-duty jobs. Both are safe, effective, and handled with care.
              </p>
              <ul className="space-y-3">
                {[
                  "Eco-friendly plant-based products",
                  "Professional-grade cleaners for tough jobs",
                  "Pet & kid safe options",
                  "Used responsibly with your approval"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-0.5">✓</span>
                    <span className="text-base" style={{ color: "#475569" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image 
                src="/eco-hero.jpeg" 
                alt="Eco and regular cleaning products" 
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: "#0F172A" }}>Why Chicago Clients Choose Us</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {text: "Local family team — not a big platform", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )},
              {text: "Eco or regular cleaning — your choice", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              {text: "We bring our own supplies & equipment", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 4h7v16H2V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 4h7M2 20h7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 8h6v10h-6V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 8h6M13 18h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 6h2v2h-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 5l2-1" />
                </svg>
              )},
              {text: "2 cleaners available for faster cleaning", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )},
              {text: "Experienced with Residential, Commercial, and Airbnb", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )},
              {text: "Clear pricing, no surprises", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
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
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: "#0F172A" }}>Transparent Pricing</h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Simple rates based on your home size. Choose eco or regular cleaning — we&apos;ll confirm exact price after photos or walkthrough.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
            {[
              { price: "$139", size: "1 bed / 1 bath" },
              { price: "$169", size: "2 bed / 1 bath" },
              { price: "$219", size: "3 bed / 2 bath" }
            ].map((tier, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <p className="text-sm mb-2" style={{ color: "#64748B" }}>from</p>
                <p className="text-5xl font-bold mb-3" style={{ color: "#0F172A" }}>{tier.price}</p>
                <p className="text-base mb-6" style={{ color: "#475569" }}>{tier.size}</p>
                <a
                  href="/book"
                  className="w-full inline-block px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center"
                  style={{ backgroundColor: "#4CAF50" }}
                  onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} 
                  onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-center max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Not every home can be cleaned 100% with eco-only products — and that&apos;s okay. If your space needs stronger solutions, we&apos;ll let you know first and use them safely.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-b" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-8" style={{ color: "#0F172A" }}>Our Approach</h2>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#334155", lineHeight: "1.7" }}>
              In the first step, we use hand-crafted, plant-based cleaning solutions made from simple, trusted ingredients like organic soap, vinegar, baking soda, salt, and water. They safely lift dirt and buildup without leaving behind toxic residues — making them perfect for homes with kids, pets, and allergy sensitivities.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "#334155", lineHeight: "1.7" }}>
              For deeper sanitation, we add the second step — EPA-registered disinfectants made from natural components like hydrogen peroxide, citric acid, and ethanol. This step eliminates up to 99.9% of bacteria and viruses, while staying gentle on your home and the environment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <div className="rounded-xl border p-6 bg-white text-left">
              <p className="text-sm font-semibold mb-2" style={{ color: brand.primary }}>Step 1 — Clean (Plant‑based)</p>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#0F172A" }}>Handcrafted organic solutions</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>Gentle formulas for everyday cleaning; safe for families and surfaces.</p>
              </div>
            <div className="rounded-xl border p-6 bg-white text-left">
              <p className="text-sm font-semibold mb-2" style={{ color: brand.primary }}>Step 2 — Disinfect (When Needed)</p>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#0F172A" }}>EPA‑registered, Safer Choice options</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>Hydrogen peroxide, citric acid or ethanol for 99.9% germ elimination.</p>
                </div>
              </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed" style={{ color: "#334155", lineHeight: "1.7" }}>
              Whether it&apos;s your family home, a busy office, or your Airbnb rental, we treat every space as if it were our own — with care, responsibility, and attention to detail. Because for us, cleaning isn&apos;t just about shiny floors — it&apos;s about helping Chicago families live healthier, happier lives.
            </p>
                </div>
              </div>
      </section>

      {/* Our Works Section */}
      <section className="py-20 border-b" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>OUR WORKS</h2>
          </div>
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevWork}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ color: "#4CAF50" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextWork}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ color: "#4CAF50" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Content */}
            <div className="mx-16">
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
      <section className="py-20 border-b" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>What Our Customers Say</h2>
            <p className="text-lg" style={{ color: "#64748B" }}>Real reviews from satisfied clients across Chicago</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
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
                  I scheduled an eco cleaning with GoCleanUSA and couldn&apos;t be happier! The team arrived on time, brought their own eco-friendly supplies, and made my apartment sparkle without any harsh smells. I love that they care about the environment while still providing an amazing clean. Highly recommend!
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
                  We&apos;ve been using GoCleanUSA&apos;s regular cleaning for months and it&apos;s always consistent and professional. The eco products leave our home fresh and chemical-free — perfect since we have pets and small kids. The cleaners are always polite and trustworthy.
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
                  Booked a last-minute cleaning before a family visit and they squeezed me in! The cleaners worked quickly but thoroughly. The eco option made the house smell clean without any strong chemicals. Excellent customer service from start to finish.
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
      <section className="py-20 border-b" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#0F172A" }}>FAQ</h2>
                </div>
          <div className="grid grid-cols-2 gap-6">
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
                  className="w-full px-0 py-4 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                >
                  <span className="text-base font-medium" style={{ color: "#0F172A" }}>
                    {faq.question}
                  </span>
                  <span className="text-2xl font-light" style={{ color: "#0F172A" }}>
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="pb-4">
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
      <footer className="py-10 border-t">
        <div className="max-w-full mx-auto px-0 flex flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#64748B" }}>©️ {new Date().getFullYear()} Go Clean USA. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
