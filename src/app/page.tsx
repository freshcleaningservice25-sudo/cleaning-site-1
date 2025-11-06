"use client";

import Image from "next/image";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";

export default function GoCleanWelcomeFinalBranded() {
  const brand = { primary: "#0E4B3D", primaryDark: "#0A3A2F", accent: "#2BBE87", bg: "#FAF8F4", text: "#0F172A" };
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    bedrooms: 2,
    bathrooms: 1,
    date: "",
    time: "",
    ecoCleaning: false,
    additionalServicesEnabled: false,
    additionalServices: [] as string[],
    serviceType: "",
    duration: "",
    service: "Residential Cleaning",
    message: ""
  });

  const additionalServicesList = [
    { id: "oven", name: "Inside the oven", price: 38, description: "Deep cleaning (inside/outside), 30-45 min." },
    { id: "refrigerator", name: "Inside the refrigerator", price: 38, description: "Shelf removal, washing/sanitization, 30-45 min." },
    { id: "cabinets", name: "Inside kitchen cabinets", price: 40, description: "Removing/returning dishes, wiping shelves", priceNote: "+ / kitchen" },
    { id: "microwave", name: "Inside the microwave", price: 16, description: "Washing inside/outside, grease removal." },
    { id: "windows", name: "Windows from inside (up to 6 pcs)", price: 49, description: "Glass/sills/frames as accessible." },
    { id: "blinds", name: "Blinds/slats", price: 11, description: "Price per window / set of blinds." },
    { id: "balcony", name: "Balcony/Patio", price: 32, description: "Outdoor space cleaning." },
    { id: "laundry", name: "Washing/Drying/Folding", price: 22, description: "Laundry service." },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccessMessage(false);

    try {
      // Convert bedrooms and bathrooms to numbers
      const dataToSend = {
        ...formData,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
      };

      // First, submit the request to admin
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        await response.text();
        throw new Error("Server error. Please check your Firebase configuration.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setRequestId(data.requestId);

      // Show success message
      setShowSuccessMessage(true);
      
      // Wait 2 seconds, then show payment modal
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsPaymentOpen(true);
      }, 2000);

    } catch (error) {
      console.error("Error submitting request:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to submit request. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdditionalServiceToggle = (serviceId: string) => {
    setFormData(prev => {
      const currentServices = prev.additionalServices || [];
      if (currentServices.includes(serviceId)) {
        return {
          ...prev,
          additionalServices: currentServices.filter(id => id !== serviceId)
        };
      } else {
        return {
          ...prev,
          additionalServices: [...currentServices, serviceId]
        };
      }
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF", color: brand.text, minWidth: '1200px' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm border-b" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "#E5E7EB" }}>
        <div className="w-full px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Go Clean USA Logo" 
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight" style={{ color: "#0F172A" }}>Go Clean USA</p>
              <p className="text-sm font-semibold" style={{ color: "#4CAF50" }}>Because clean feels better.</p>
            </div>
          </div>
          <nav className="flex items-center gap-8 text-base">
            <a 
              href="#hero" 
              className="font-medium transition-colors duration-200 hover:text-green-600" 
              style={{ color: "#374151" }}
            >
              About Us
            </a>
            <a 
              href="#services" 
              className="font-medium transition-colors duration-200 hover:text-green-600" 
              style={{ color: "#374151" }}
            >
              Services
            </a>
            <a 
              href="#approach" 
              className="font-medium transition-colors duration-200 hover:text-green-600" 
              style={{ color: "#374151" }}
            >
              Our Approach
            </a>
            <a 
              href="#contact" 
              className="font-medium transition-colors duration-200 hover:text-green-600" 
              style={{ color: "#374151" }}
            >
              Contact
            </a>
          </nav>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105" 
            style={{ backgroundColor: "#4CAF50", fontSize: "15px" }}
            onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} 
            onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}
          >
            Book Cleaning
          </a>
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
          <div className="relative w-1/2">
            <div className="w-full rounded-3xl overflow-hidden">
              <Image 
                src="/clean-hero-removebg-preview.png" 
                alt="Professional cleaning service" 
                width={1500}
                height={1850}
                className="w-full h-auto object-contain"
                style={{ border: 'none', outline: 'none' }}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )},
              {title:'Move In / Move Out', description:'Inside appliances, cabinets, baseboards and more.', icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
            <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500 text-center">Eco and regular cleaning products</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              )},
              {text: "2 cleaners available for faster cleaning", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )},
              {text: "Experienced with Residential, Commercial, and Airbnb", icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#4CAF50" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

      {/* Contact */}
      <section id="contact" className="py-20" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-16 items-start">
          <div className="pt-8">
            <h2 className="text-5xl font-bold tracking-tight mb-6" style={{ color: "#0F172A" }}>Ready for a calmer, cleaner space?</h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#475569" }}>Tell us about your rooms, schedule and priorities. We&apos;ll tailor a plan that feels just right.</p>
            <ul className="space-y-3 text-base" style={{ color: "#475569" }}>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Eco‑first daily cleaning</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>99.9% disinfection when needed</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Transparent pricing</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl border shadow-lg p-10" style={{ borderColor: "#E2E8F0", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
            {showSuccessMessage ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#4CAF50" }}>Request Sent Successfully! 🎉</h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Your request has been received. Redirecting to payment...
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid gap-5">
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Your name" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Email</label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="you@email.com" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Phone</label>
                  <input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="(xxx) xxx‑xxxx" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Address</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Street address" 
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="City" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Zip Code</label>
                  <input 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="Zip code" 
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Number of Bedrooms*</label>
                  <input 
                    name="bedrooms"
                    type="number" 
                    min="1" 
                    max="10" 
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="2" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Number of Bathrooms*</label>
                  <input 
                    name="bathrooms"
                    type="number" 
                    min="1" 
                    max="10" 
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="1" 
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Preferred Date*</label>
                  <input 
                    name="date"
                    type="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Preferred Time*</label>
                  <input 
                    name="time"
                    type="time" 
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    required
                  />
                </div>
              </div>
              {/* Eco Cleaning Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "#E2E8F0", backgroundColor: formData.ecoCleaning ? "#F0FDF4" : "#FAFAFA" }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌿</span>
                  <label className="text-base font-semibold" style={{ color: "#0F172A" }}>Eco Cleaning</label>
                  <span className="text-sm" style={{ color: "#64748B" }}>
                    {formData.ecoCleaning ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="ecoCleaning"
                    checked={formData.ecoCleaning}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Additional Services Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "#E2E8F0", backgroundColor: formData.additionalServicesEnabled ? "#F0FDF4" : "#FAFAFA" }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">➕</span>
                  <label className="text-base font-semibold" style={{ color: "#0F172A" }}>Additional Services</label>
                  <span className="text-sm" style={{ color: "#64748B" }}>
                    {formData.additionalServicesEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="additionalServicesEnabled"
                    checked={formData.additionalServicesEnabled}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Additional Services List */}
              {formData.additionalServicesEnabled && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border" style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}>
                  {additionalServicesList.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
                      style={{
                        borderColor: formData.additionalServices?.includes(service.id) ? "#4CAF50" : "#E2E8F0",
                        backgroundColor: formData.additionalServices?.includes(service.id) ? "#F0FDF4" : "#FFFFFF"
                      }}
                      onClick={() => handleAdditionalServiceToggle(service.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.additionalServices?.includes(service.id) || false}
                        onChange={() => handleAdditionalServiceToggle(service.id)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-semibold cursor-pointer" style={{ color: "#0F172A" }}>
                            {service.name}
                          </label>
                          <span className="text-sm font-bold" style={{ color: "#4CAF50" }}>
                            ${service.price}{service.priceNote && <span className="text-xs font-normal">{service.priceNote}</span>}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "#64748B" }}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Service Type</label>
                  <select 
                    name="serviceType"
                    value={formData.serviceType || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Regular">Regular</option>
                    <option value="Deep">Deep</option>
                    <option value="Move-in/out">Move-in/out</option>
                    <option value="Junk Removal">Junk Removal</option>
                    <option value="Windows">Windows</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <option>Residential Cleaning</option>
                    <option>Commercial Cleaning</option>
                    <option>Airbnb / Turnover</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Message</label>
                <textarea 
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Rooms, pets, floors, preferred days…"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-bold shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transform hover:scale-[1.02]" 
                style={{ backgroundColor: "#4CAF50" }} 
                onMouseEnter={(e)=>!isSubmitting && ((e.target as HTMLButtonElement).style.backgroundColor="#388E3C")} 
                onMouseLeave={(e)=>!isSubmitting && ((e.target as HTMLButtonElement).style.backgroundColor="#4CAF50")}
              >
                {isSubmitting ? "Sending Request..." : "Book Cleaning"}
              </button>
            </form>
            )}
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
      
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        serviceData={formData}
        requestId={requestId}
      />
    </div>
  );
}
