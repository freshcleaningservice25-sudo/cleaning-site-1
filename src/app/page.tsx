"use client";

import Image from "next/image";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";

export default function GoCleanWelcomeFinalBranded() {
  const brand = { primary: "#0E4B3D", primaryDark: "#0A3A2F", accent: "#2BBE87", bg: "#FAF8F4", text: "#0F172A" };
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
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
    serviceType: "",
    duration: "",
    service: "Residential Cleaning",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF", color: brand.text }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur border-b" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
        <div className="w-full px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* If you have a real file, replace src below (e.g., /goclean-logo.svg). */}
            {/* <img src="/goclean-logo.svg" alt="Go Clean USA" className="h-8 w-auto" /> */}
            <div className="h-12 w-12 rounded-xl border grid place-items-center" style={{ borderColor: brand.primary, color: brand.primary }}>🌿</div>
            <div>
              <p className="text-xl font-semibold tracking-tight">Go Clean USA</p>
              <p className="text-sm font-bold" style={{ color: "#4CAF50" }}>Because clean feels better.</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            <a href="#hero" className="hover:underline font-medium">About Us</a>
            <a href="#services" className="hover:underline font-medium">Services</a>
            <a href="#approach" className="hover:underline font-medium">Our Approach</a>
            <a href="#contact" className="hover:underline font-medium">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-xl text-white text-sm font-semibold shadow transition" style={{ backgroundColor: "#4CAF50" }} onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}>Book Cleaning</a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="border-b">
        <div className="w-full py-20 flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Go Clean USA</h1>
            <p className="mt-1 text-base font-bold" style={{ color: "#4CAF50" }}>Because clean feels better.</p>

            <p className="mt-6 text-lg" style={{ color: "#334155" }}>
              Tired of harsh chemicals and unreliable cleaning services? At Go Clean USA, we transform homes and businesses with eco-friendly, toxin-free cleaning that protects your health and the planet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="px-5 py-3 rounded-2xl text-white font-semibold shadow transition" style={{ backgroundColor: "#4CAF50" }} onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}>Book Cleaning</a>
              <a href="#approach" className="px-5 py-3 rounded-2xl border" style={{ borderColor: "#4CAF50", color: "#4CAF50" }}>Our Approach</a>
            </div>
            <p className="mt-6 text-xs" style={{ color: "#64748B" }}>Serving Chicago & suburbs • Residential • Commercial • Airbnb</p>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="aspect-[30/37] w-full rounded-3xl overflow-hidden border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
              <Image 
                src="/images/clean-hero.png" 
                alt="Professional cleaning service" 
                width={1500}
                height={1850}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b">
        <div className="max-w-full mx-auto px-0 py-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Services</h2>
          <p className="mt-3" style={{ color: "#475569" }}>Thoughtful cleaning for homes, businesses and short‑term rentals.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {icon:'🏠', title:'Residential Cleaning', lines:['Recurring & Deep','Move‑in / Move‑out','Kitchen • Bath • Floors']},
              {icon:'🏢', title:'Commercial Cleaning', lines:['Offices & Retail','Common Areas','After‑hours Available']},
              {icon:'🏡', title:'Airbnb Turnover', lines:['Fast Turnaround','Linen Change & Staging','5‑Star Readiness']},
            ].map((s,i)=> (
              <div key={i} className="rounded-3xl border p-6 shadow-sm hover:shadow transition bg-white">
                <div className="text-4xl">{s.icon}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <ul className="mt-3 space-y-1 text-sm" style={{ color: "#475569" }}>
                  {s.lines.map((l,j)=> <li key={j} className="flex gap-2"><span>•</span><span>{l}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-b" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-full mx-auto px-0 py-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Approach</h2>
          <p className="mt-4 text-base" style={{ color: "#334155" }}>
            In the first step, we use hand-crafted, plant-based cleaning solutions made from simple, trusted ingredients like organic soap, vinegar, baking soda, salt, and water. They safely lift dirt and buildup without leaving behind toxic residues — making them perfect for homes with kids, pets, and allergy sensitivities.
          </p>
          <p className="mt-4 text-base" style={{ color: "#334155" }}>
            For deeper sanitation, we add the second step — EPA-registered disinfectants made from natural components like hydrogen peroxide, citric acid, and ethanol. This step eliminates up to 99.9% of bacteria and viruses, while staying gentle on your home and the environment.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border p-6 bg-white">
              <p className="text-sm font-semibold" style={{ color: brand.primary }}>Step 1 — Clean (Plant‑based)</p>
              <h3 className="mt-1 text-xl font-semibold">Handcrafted organic solutions</h3>
              <p className="mt-2 text-sm" style={{ color: "#475569" }}>Gentle formulas for everyday cleaning; safe for families and surfaces.</p>
            </div>
            <div className="rounded-3xl border p-6 bg-white">
              <p className="text-sm font-semibold" style={{ color: brand.primary }}>Step 2 — Disinfect (When Needed)</p>
              <h3 className="mt-1 text-xl font-semibold">EPA‑registered, Safer Choice options</h3>
              <p className="mt-2 text-sm" style={{ color: "#475569" }}>Hydrogen peroxide, citric acid or ethanol for 99.9% germ elimination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing line */}
      <section className="border-b">
        <div className="max-w-full mx-auto px-0 py-12">
          <p className="text-lg" style={{ color: "#334155" }}>
            Whether it’s your family home, a busy office, or your Airbnb rental, we treat every space as if it were our own — with care, responsibility, and attention to detail. Because for us, cleaning isn’t just about shiny floors — it’s about helping Chicago families live healthier, happier lives.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-full mx-auto px-0 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready for a calmer, cleaner space?</h2>
            <p className="mt-3" style={{ color: "#475569" }}>Tell us about your rooms, schedule and priorities. We&apos;ll tailor a plan that feels just right.</p>
            <ul className="mt-6 text-sm" style={{ color: "#475569" }}>
              <li>• Eco‑first daily cleaning</li>
              <li>• 99.9% disinfection when needed</li>
              <li>• Transparent pricing</li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl border shadow p-8">
            <form onSubmit={handleFormSubmit} className="grid gap-6">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Your name" 
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="you@email.com" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="(xxx) xxx‑xxxx" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Street address" 
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="City" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Zip Code</label>
                  <input 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="Zip code" 
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Number of Bedrooms*</label>
                  <input 
                    name="bedrooms"
                    type="number" 
                    min="1" 
                    max="10" 
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="2" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Number of Bathrooms*</label>
                  <input 
                    name="bathrooms"
                    type="number" 
                    min="1" 
                    max="10" 
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="1" 
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Preferred Date*</label>
                  <input 
                    name="date"
                    type="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Time*</label>
                  <input 
                    name="time"
                    type="time" 
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }} 
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Service Type</label>
                  <select 
                    name="serviceType"
                    value={formData.serviceType || ""}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
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
                  <label className="text-sm font-medium">Duration</label>
                  <select 
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                    style={{ borderColor: "#E2E8F0" }}
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="2.5 hours">2.5 hours</option>
                    <option value="4 hours">4 hours</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Service</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                  style={{ borderColor: "#E2E8F0" }}
                >
                  <option>Residential Cleaning</option>
                  <option>Commercial Cleaning</option>
                  <option>Airbnb / Turnover</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" 
                  style={{ borderColor: "#E2E8F0" }} 
                  placeholder="Rooms, pets, floors, preferred days…"
                />
              </div>
              <button type="submit" className="inline-flex items-center justify-center px-6 py-4 rounded-2xl text-white font-semibold shadow transition text-lg" style={{ backgroundColor: "#4CAF50" }} onMouseEnter={(e)=>((e.target as HTMLButtonElement).style.backgroundColor="#388E3C")} onMouseLeave={(e)=>((e.target as HTMLButtonElement).style.backgroundColor="#4CAF50")}>Book Cleaning</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-full mx-auto px-0 flex flex-col md:flex-row items-center justify-between gap-4">
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
      />
    </div>
  );
}
