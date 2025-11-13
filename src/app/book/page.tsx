"use client";

import { useState } from "react";
import Image from "next/image";
import PaymentModal from "../../components/PaymentModal";
import Link from "next/link";

export default function BookPage() {
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
    serviceType: "Standard",
    duration: "One-time",
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

  // Calculate price based on current selections
  const calculatePrice = () => {
    const bedrooms = Number(formData.bedrooms) || 1;
    const bathrooms = Number(formData.bathrooms) || 1;
    let basePrice = 0;

    // Pricing based on bedrooms and bathrooms
    if (bedrooms === 1 && bathrooms === 1) {
      basePrice = 139; // $139
    } else if (bedrooms === 2 && bathrooms === 1) {
      basePrice = 169; // $169
    } else if (bedrooms === 3 && bathrooms === 2) {
      basePrice = 219; // $219
    } else {
      // For other combinations, calculate based on size
      // Base: $139 for 1 bed/1 bath
      // Additional bedroom: +$30
      // Additional bathroom: +$20
      basePrice = 139 + ((bedrooms - 1) * 30) + ((bathrooms - 1) * 20);
    }

    // Add 10% premium for eco cleaning
    if (formData.ecoCleaning) {
      basePrice = Math.round(basePrice * 1.1);
    }

    // Add additional services prices
    const additionalServicesPricing: Record<string, number> = {
      oven: 38,
      refrigerator: 38,
      cabinets: 40,
      microwave: 16,
      windows: 49,
      blinds: 11,
      balcony: 32,
      laundry: 22,
    };

    if (formData.additionalServices && formData.additionalServices.length > 0) {
      formData.additionalServices.forEach((serviceId: string) => {
        if (additionalServicesPricing[serviceId]) {
          basePrice += additionalServicesPricing[serviceId];
        }
      });
    }
    
    return basePrice;
  };

  const estimatedPrice = calculatePrice();

  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.bg, minWidth: '1200px' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm border-b" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "#E5E7EB" }}>
        <div className="w-full px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo2.png" 
                alt="Go Clean USA Logo" 
                width={64}
                height={64}
                className="h-full w-full object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(85%) contrast(130%)' }}
              />
            </div>
            <span className="text-2xl font-bold" style={{ color: "#4CAF50" }}>Go Clean USA</span>
          </Link>
          <Link 
            href="/"
            className="px-6 py-2.5 rounded-xl font-semibold transition-all"
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
            onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#388E3C")} 
            onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#4CAF50")}
          >
            Back to Home
          </Link>
            </div>
      </header>

      {/* Booking Form Section */}
      <section className="py-20" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight mb-6" style={{ color: "#0F172A" }}>Book Your Cleaning Service</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Tell us about your rooms, schedule and priorities. We&apos;ll tailor a plan that feels just right.
            </p>
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

              {/* Service Type and Frequency Section */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: "#0F172A" }}>2) Type of Cleaning and Periodicity</h3>
                
                <div className="mb-4 flex items-center gap-4">
                  <label className="text-sm font-semibold whitespace-nowrap" style={{ color: "#0F172A", minWidth: "60px" }}>Type:</label>
                  <div className="flex flex-1 rounded-lg overflow-hidden" style={{ border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF" }}>
                    {["Standard", "Deep", "Move-In/Out"].map((type, index) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: type }))}
                        className="flex-1 px-5 py-2.5 font-semibold transition-all"
                        style={{
                          backgroundColor: formData.serviceType === type ? "#0F172A" : "#FFFFFF",
                          borderRight: index < 2 ? "1px solid #E2E8F0" : "none",
                          color: formData.serviceType === type ? "#FFFFFF" : "#0F172A",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <label className="text-sm font-semibold whitespace-nowrap" style={{ color: "#0F172A", minWidth: "60px" }}>Frequency:</label>
                  <div className="flex gap-2 flex-1 flex-wrap">
                    {["One-time", "Monthly", "Once every 2 weeks", "Weekly"].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, duration: freq }))}
                        className="px-5 py-2.5 rounded-lg font-semibold transition-all border"
                        style={{
                          backgroundColor: formData.duration === freq ? "#0F172A" : "#FFFFFF",
                          borderColor: formData.duration === freq ? "#0F172A" : "#E2E8F0",
                          borderWidth: "1px",
                          color: formData.duration === freq ? "#FFFFFF" : "#0F172A",
                          cursor: "pointer"
                        }}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <label className="text-sm font-semibold whitespace-nowrap" style={{ color: "#0F172A", minWidth: "60px" }}>Products:</label>
                  <div className="flex gap-2 flex-1">
                    {["Regular", "Eco"].map((product) => (
                      <button
                        key={product}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, ecoCleaning: product === "Eco" }))}
                        className="px-5 py-2.5 rounded-lg font-semibold transition-all border"
                        style={{
                          backgroundColor: ((product === "Eco" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#0F172A" : "#FFFFFF",
                          borderColor: ((product === "Eco" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#0F172A" : "#E2E8F0",
                          borderWidth: "1px",
                          color: ((product === "Eco" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#FFFFFF" : "#0F172A",
                          cursor: "pointer"
                        }}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
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

              {/* Pricing Estimate Section */}
              <div className="rounded-xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "#86EFAC" }}>
                <div className="mb-3">
                  <span className="text-lg font-bold" style={{ color: "#0F172A" }}>
                    Estimate: ${estimatedPrice} / visit
                  </span>
                </div>
                <div className="text-sm space-y-1" style={{ color: "#475569" }}>
                  <p>Basic materials and inventory are included. Eco-friendly products are available at the client&apos;s choice.</p>
                  <p>The final price is confirmed by photo/video or upon inspection.</p>
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        serviceData={formData}
        requestId={requestId}
      />
    </div>
  );
}
