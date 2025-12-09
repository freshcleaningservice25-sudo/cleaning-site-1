"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PaymentModal from "../../components/PaymentModal";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import BookingKoala from "../../components/BookingKoala";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Check if BookingKoala is enabled
const useBookingKoala = process.env.NEXT_PUBLIC_USE_BOOKINGKOALA === "true";
const bookingKoalaMode = (process.env.NEXT_PUBLIC_BOOKINGKOALA_MODE || "redirect") as "embed" | "redirect" | "iframe";

// Custom booking form component
function CustomBookingForm() {
  const brand = { primary: "#0E4B3D", primaryDark: "#0A3A2F", accent: "#2BBE87", bg: "#FAF8F4", text: "#0F172A" };
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
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
    ecoCleaning: false,
    additionalServices: [] as string[],
    serviceType: "Standard",
    duration: "One-time",
    service: "Residential Cleaning",
    message: ""
  });

  const additionalServicesList = [
    { id: "heavy", name: "Heavy Duty / Post Construction", price: 60, priceType: "percentage", description: "Intensive cleaning after construction (+60% of base price)", icon: "house-stars-heavy" },
    { id: "pet", name: "Pet in the house", price: 15, priceType: "fixed", description: "Cleaning service for homes with pets", icon: "house-pets" },
    { id: "windows", name: "Interior Windows", price: 50, priceType: "fixed", description: "Windows from inside (up to 6 pcs)", icon: "window" },
    { id: "blinds", name: "Wet Wipe Window Blinds (per window)", price: 10, priceType: "fixed", description: "Price per window / set of blinds", icon: "blinds" },
    { id: "fan", name: "Ceiling Fan / Chandelier (per one)", price: 15, priceType: "fixed", description: "Cleaning ceiling fans and chandeliers", icon: "fan" },
    { id: "oven", name: "Inside Oven", price: 30, priceType: "fixed", description: "Deep cleaning (inside/outside), 30-45 min.", icon: "oven" },
    { id: "refrigerator", name: "Inside Fridge", price: 30, priceType: "fixed", description: "Shelf removal, washing/sanitization, 30-45 min.", icon: "fridge" },
    { id: "cabinets-empty", name: "Inside Cabinets (Empty)", price: 50, priceType: "fixed", description: "Cleaning empty kitchen cabinets", icon: "cabinets" },
    { id: "cabinets-full", name: "Inside Cabinets (full)", price: 70, priceType: "fixed", description: "Cleaning cabinets with items inside", icon: "cabinets-full" },
    { id: "dishes", name: "Wash 1 sink full of dishes", price: 20, priceType: "fixed", description: "Dishwashing service", icon: "dishes" },
    { id: "laundry", name: "Laundry", price: 25, priceType: "fixed", description: "Washing/Drying/Folding", icon: "laundry" },
    { id: "hardwood", name: "Hardwood Floor Scrubbing & Polishing (per room)", price: 45, priceType: "fixed", description: "Professional floor care", icon: "floor" },
    { id: "garage", name: "Sweep inside Garage", price: 35, priceType: "fixed", description: "Garage cleaning service", icon: "garage" },
    { id: "rug-small", name: "Rug Cleaning (small, ea.)", price: 20, priceType: "fixed", description: "Small rug cleaning service", icon: "rug" },
    { id: "rug-big", name: "Rug cleaning (big, ea.)", price: 40, priceType: "fixed", description: "Large rug cleaning service", icon: "rug-big" },
    { id: "patio", name: "Patio / Balcony Sweep & Clean", price: 20, priceType: "fixed", description: "Outdoor patio or balcony cleaning", icon: "patio" },
    { id: "trash", name: "Trash Removal (Multiple Bags)", price: 20, priceType: "fixed", description: "Removal of multiple trash bags", icon: "trash" },
    { id: "bed-linen", name: "Bed Linen Change (per bed)", price: 10, priceType: "fixed", description: "Changing bed linens per bed", icon: "bed" },
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

    // Calculate additional services prices
    let additionalServicesTotal = 0;
    let hasHeavyDuty = false;

    if (formData.additionalServices && formData.additionalServices.length > 0) {
      formData.additionalServices.forEach((serviceId: string) => {
        const service = additionalServicesList.find(s => s.id === serviceId);
        if (service) {
          if (service.priceType === "percentage") {
            // Percentage-based pricing (e.g., Heavy Duty +60%)
            hasHeavyDuty = true;
            // Will be applied after calculating fixed prices
          } else if (service.price > 0) {
            // Fixed price services
            additionalServicesTotal += service.price;
          }
        }
      });
    }

    // Apply percentage-based add-ons (like Heavy Duty +60%)
    if (hasHeavyDuty) {
      const heavyDutyService = additionalServicesList.find(s => s.id === "heavy");
      if (heavyDutyService && formData.additionalServices.includes("heavy")) {
        const percentageIncrease = (basePrice * heavyDutyService.price) / 100;
        additionalServicesTotal += percentageIncrease;
      }
    }

    return Math.round(basePrice + additionalServicesTotal);
  };

  const estimatedPrice = calculatePrice();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: brand.bg }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm border-b" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "#E5E7EB" }}>
        <div className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <div className="logo-crop">
              <Image 
                src="/logo_2.svg" 
                alt="Go Clean USA Logo" 
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: "#0C5E3E" }}>Go Clean USA</span>
          </Link>
          <Link 
            href="/"
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base"
            style={{ backgroundColor: "#0C5E3E", color: "#FFFFFF" }}
            onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#09402A")} 
            onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#0C5E3E")}
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Booking Form Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: brand.bg }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6" style={{ color: "#0F172A" }}>Book Your Cleaning Service</h1>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed px-4" style={{ color: "#475569" }}>
              Tell us about your rooms, schedule and priorities. We&apos;ll tailor a plan that feels just right.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border shadow-lg p-4 sm:p-6 md:p-8 lg:p-10" style={{ borderColor: "#E2E8F0", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
            {!stripePublishableKey && (
              <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your Vercel environment variables.
                </p>
              </div>
            )}
            {stripePromise ? (
              <Elements stripe={stripePromise}>
            {showSuccessMessage ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#0C5E3E" }}>Request Sent Successfully! 🎉</h3>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Number of Bedrooms*</label>
                  <input 
                    name="bedrooms"
                    type="number" 
                    min="1" 
                    max="10" 
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border px-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
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
                    className="w-full rounded-xl border px-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="1" 
                    required
                  />
                </div>
              </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Preferred Date*</label>
                <div className="relative">
                  <input 
                    name="date"
                    type="text" 
                    value={formData.date}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                      }
                      if (value.length >= 5) {
                        value = value.slice(0, 5) + '/' + value.slice(5, 9);
                      }
                      setFormData(prev => ({ ...prev, date: value }));
                    }}
                    className="w-full rounded-xl border px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                    style={{ borderColor: "#E2E8F0" }} 
                    placeholder="MM/DD/YYYY"
                    maxLength={10}
                    pattern="(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}"
                    required
                  />
                  <input 
                    ref={dateInputRef}
                    type="date"
                    className="absolute opacity-0 pointer-events-none"
                    onChange={(e) => {
                      if (e.target.value) {
                        const date = new Date(e.target.value);
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const year = date.getFullYear();
                        setFormData(prev => ({ ...prev, date: `${month}/${day}/${year}` }));
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Open calendar"
                  >
                    <svg className="w-5 h-5" style={{ color: "#64748B" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
            </div>
          </div>

              {/* Service Type and Frequency Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-4" style={{ color: "#0F172A" }}>2) Type of Cleaning and Periodicity</h3>
                
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-semibold" style={{ color: "#0F172A" }}>Type:</label>
                  <div className="flex flex-1 rounded-lg overflow-hidden" style={{ border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF" }}>
                    {["Standard", "Deep", "Move-In/Out"].map((type, index) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: type }))}
                        className="flex-1 px-3 sm:px-5 py-2 sm:py-2.5 font-semibold transition-all text-xs sm:text-sm"
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

                <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-semibold" style={{ color: "#0F172A" }}>Frequency:</label>
                  <div className="flex gap-2 flex-1 flex-wrap">
                    {["One-time", "Monthly", "Once every 2 weeks", "Weekly"].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, duration: freq }))}
                        className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all border text-xs sm:text-sm"
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

                <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-semibold" style={{ color: "#0F172A" }}>Products:</label>
                  <div className="flex gap-2 flex-1">
                    {["Regular", "Organic"].map((product) => (
                      <button
                        key={product}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, ecoCleaning: product === "Organic" }))}
                        className="flex-1 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all border text-xs sm:text-sm"
                        style={{
                          backgroundColor: ((product === "Organic" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#0F172A" : "#FFFFFF",
                          borderColor: ((product === "Organic" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#0F172A" : "#E2E8F0",
                          borderWidth: "1px",
                          color: ((product === "Organic" && formData.ecoCleaning) || (product === "Regular" && !formData.ecoCleaning)) ? "#FFFFFF" : "#0F172A",
                          cursor: "pointer"
                        }}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Select Extras Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ color: "#0F172A" }}>Select Extras</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {additionalServicesList.map((service) => {
                    const isSelected = formData.additionalServices?.includes(service.id) || false;
                    return (
                    <div
                      key={service.id}
                        className="flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md"
                      style={{
                          borderColor: isSelected ? "#0C5E3E" : "#E2E8F0",
                          backgroundColor: isSelected ? "#F0FDF4" : "#FFFFFF",
                          borderWidth: isSelected ? "2px" : "1px"
                      }}
                      onClick={() => handleAdditionalServiceToggle(service.id)}
                    >
                        {/* Icon */}
                        <div className="mb-3 w-12 h-12 flex items-center justify-center" style={{ color: "#0C5E3E" }}>
                          {service.icon === "house-stars" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 9l-3.5 4.5 1.5-4.5L4.5 6.5H9z" />
                            </svg>
                          )}
                          {service.icon === "house-stars-heavy" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 9l-3.5 4.5 1.5-4.5L4.5 6.5H9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 2l1 3h3l-2 1.5 1 3L9 7l-2 1.5 1-3L5 5h3z" />
                            </svg>
                          )}
                          {service.icon === "house-pets" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14c0-1.5 1.5-2 2-2s2 .5 2 2M16 14c0-1.5 1.5-2 2-2s2 .5 2 2" />
                              <circle cx="9" cy="15" r="1" fill="currentColor" />
                              <circle cx="15" cy="15" r="1" fill="currentColor" />
                            </svg>
                          )}
                          {service.icon === "window" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth={1} />
                              <line x1="4" y1="12" x2="20" y2="12" strokeWidth={1} />
                              <line x1="12" y1="4" x2="12" y2="20" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "blinds" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth={1} />
                              <line x1="4" y1="7" x2="20" y2="7" strokeWidth={1} />
                              <line x1="4" y1="10" x2="20" y2="10" strokeWidth={1} />
                              <line x1="4" y1="13" x2="20" y2="13" strokeWidth={1} />
                              <line x1="4" y1="16" x2="20" y2="16" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "fan" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="8" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v4M12 16v4M4 12h4M16 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
                            </svg>
                          )}
                          {service.icon === "oven" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="6" width="16" height="12" rx="1" strokeWidth={1} />
                              <rect x="6" y="8" width="12" height="8" rx="0.5" strokeWidth={1} />
                              <circle cx="9" cy="12" r="1.5" fill="currentColor" />
                              <circle cx="15" cy="12" r="0.5" fill="currentColor" />
                            </svg>
                          )}
                          {service.icon === "fridge" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="6" y="4" width="12" height="16" rx="1" strokeWidth={1} />
                              <line x1="12" y1="4" x2="12" y2="20" strokeWidth={1} />
                              <rect x="8" y="7" width="8" height="3" rx="0.5" strokeWidth={1} />
                              <rect x="8" y="11" width="8" height="3" rx="0.5" strokeWidth={1} />
                              <rect x="8" y="15" width="8" height="3" rx="0.5" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "cabinets" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="6" width="16" height="14" rx="1" strokeWidth={1} />
                              <line x1="4" y1="13" x2="20" y2="13" strokeWidth={1} />
                              <rect x="6" y="8" width="8" height="4" rx="0.5" strokeWidth={1} />
                              <rect x="6" y="15" width="8" height="4" rx="0.5" strokeWidth={1} />
                              <line x1="10" y1="8" x2="10" y2="12" strokeWidth={1} />
                              <line x1="10" y1="15" x2="10" y2="19" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "cabinets-full" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="6" width="16" height="14" rx="1" strokeWidth={1} />
                              <line x1="4" y1="13" x2="20" y2="13" strokeWidth={1} />
                              <rect x="6" y="8" width="8" height="4" rx="0.5" strokeWidth={1} fill="currentColor" opacity="0.2" />
                              <rect x="6" y="15" width="8" height="4" rx="0.5" strokeWidth={1} fill="currentColor" opacity="0.2" />
                              <line x1="7" y1="9" x2="13" y2="9" strokeWidth={1} />
                              <line x1="7" y1="11" x2="13" y2="11" strokeWidth={1} />
                              <line x1="7" y1="16" x2="13" y2="16" strokeWidth={1} />
                              <line x1="7" y1="18" x2="13" y2="18" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "plant" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2C8.5 2 5.5 4.5 5.5 8c0 4.5 6.5 12 6.5 12s6.5-7.5 6.5-12c0-3.5-3-6-6.5-6zm0 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v2M10 10h4" />
                            </svg>
                          )}
                          {service.icon === "dishes" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="8" width="16" height="10" rx="1" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 10h12M8 12h8M10 14h4" />
                              <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
                              <circle cx="12" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
                              <circle cx="17" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
                            </svg>
                          )}
                          {service.icon === "laundry" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1} />
                              <circle cx="12" cy="12" r="5" strokeWidth={1} />
                              <circle cx="12" cy="12" r="2" fill="currentColor" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 7v2M12 15v2" />
                            </svg>
                          )}
                          {service.icon === "floor" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="10" width="16" height="10" rx="1" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 13h16M4 16h16M4 19h16" />
                              <circle cx="7" cy="14.5" r="1.5" strokeWidth={1} />
                              <circle cx="17" cy="14.5" r="1.5" strokeWidth={1} />
                            </svg>
                          )}
                          {service.icon === "garage" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16v12H4z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6l10 6 10-6" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14l2-2 2 2M12 12v4" />
                            </svg>
                          )}
                          {service.icon === "rug" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <ellipse cx="12" cy="12" rx="8" ry="4" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 9l-3.5 4.5 1.5-4.5L4.5 6.5H9z" />
                            </svg>
                          )}
                          {service.icon === "rug-big" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <ellipse cx="12" cy="12" rx="10" ry="5" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 9l-3.5 4.5 1.5-4.5L4.5 6.5H9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 2l1 3h3l-2 1.5 1 3L9 7l-2 1.5 1-3L5 5h3z" />
                            </svg>
                          )}
                          {service.icon === "baseboard" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="18" width="16" height="2" rx="1" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 20h16M6 18v-2M10 18v-2M14 18v-2M18 18v-2" />
                            </svg>
                          )}
                          {service.icon === "wall" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth={1} />
                              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
                              <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.3" />
                            </svg>
                          )}
                          {service.icon === "patio" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="12" width="16" height="8" rx="1" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 12h16M6 12v-4M10 12v-4M14 12v-4M18 12v-4" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 8l2-2M16 8l-2-2" />
                            </svg>
                          )}
                          {service.icon === "trash" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          {service.icon === "bed" && (
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="4" y="6" width="16" height="12" rx="1" strokeWidth={1} />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 12h16M6 8v8M18 8v8" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h8M8 14h8" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Service Name and Price */}
                        <div className="text-center mb-2 flex-1">
                          <p className="text-xs font-medium" style={{ color: "#0F172A" }}>
                            {service.name}
                          </p>
                          {service.price > 0 && (
                            <p className="text-xs font-semibold mt-1" style={{ color: "#0C5E3E" }}>
                              {service.priceType === "percentage" 
                                ? `+${service.price}%` 
                                : `$${service.price}`}
                            </p>
                          )}
                        </div>
                        
                        {/* Info Icon */}
                        <div className="mt-auto">
                          <svg className="w-4 h-4" style={{ color: "#64748B" }} fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} fill="none" />
                            <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">i</text>
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Estimate Section */}
              <div className="rounded-xl p-6 border" style={{ backgroundColor: "#F0FDF4", borderColor: "#86EFAC" }}>
                <div className="mb-3">
                  <span className="text-lg font-bold" style={{ color: "#0F172A" }}>
                    Estimate: ${estimatedPrice} / visit
                  </span>
                </div>
                <div className="text-sm space-y-1" style={{ color: "#475569" }}>
                  <p>Basic materials and inventory are included. Organic products are available at the client&apos;s choice.</p>
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

              {/* Payment Information Section */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: "#0F172A" }}>Payment Information</h3>
                
                <div className="mb-4">
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="newCard"
                      defaultChecked
                      className="w-4 h-4"
                      style={{ accentColor: "#0C5E3E" }}
                    />
                    <span className="text-sm font-medium" style={{ color: "#0F172A" }}>New Credit Card</span>
                  </label>
                  
                  <div className="ml-6">
                    <h4 className="text-sm font-semibold mb-3" style={{ color: "#0F172A" }}>Add new card</h4>
                    
                    <div className="relative mb-4">
                      <label className="text-sm font-semibold mb-2 block" style={{ color: "#0F172A" }}>Card number</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg className="w-5 h-5" style={{ color: "#64748B" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div className="w-full rounded-xl border px-4 py-3 pl-12 outline-none focus-within:ring-2 focus-within:ring-green-500 transition-all" style={{ borderColor: "#E2E8F0", minHeight: "48px" }}>
                          <CardElement
                            options={{
                              style: {
                                base: {
                                  fontSize: '16px',
                                  color: '#0F172A',
                                  fontFamily: 'Arial, sans-serif',
                                  '::placeholder': {
                                    color: '#94a3b8',
                                  },
                                },
                                invalid: {
                                  color: '#ef4444',
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Accepted Payment Methods */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {/* Mastercard */}
                      <div className="w-16 h-10 rounded flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
                        <div className="absolute top-2 left-2 flex items-center">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#EB001B", marginRight: "-3px", zIndex: 2 }}></div>
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#F79E1B", zIndex: 1 }}></div>
                        </div>
                        <span className="text-white text-[8px] font-normal mt-4" style={{ letterSpacing: "0.5px" }}>mastercard</span>
                      </div>
                      
                      {/* Visa */}
                      <div className="w-16 h-10 rounded flex items-center justify-center" style={{ backgroundColor: "#1434CB" }}>
                        <span className="text-white font-bold text-sm" style={{ letterSpacing: "1px" }}>VISA</span>
                      </div>
                      
                      {/* Discover Network */}
                      <div className="w-20 h-10 rounded flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                        <div className="flex items-center">
                          <span className="text-black font-bold text-xs">DISCOV</span>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF6000", marginLeft: "1px", marginRight: "1px" }}></div>
                          <span className="text-black font-bold text-xs">ER</span>
                        </div>
                        <span className="text-black text-[7px] font-bold mt-0.5">NETWORK</span>
                        <div className="absolute bottom-0 right-0 w-8 h-4 rounded-tl-full" style={{ backgroundColor: "#FF6000", opacity: 0.3 }}></div>
                      </div>
                      
                      {/* American Express */}
                      <div className="w-20 h-10 rounded flex flex-col items-center justify-center" style={{ backgroundColor: "#006FCF" }}>
                        <span className="text-white font-bold text-[9px]" style={{ letterSpacing: "0.5px" }}>AMERICAN</span>
                        <span className="text-white font-bold text-[9px]" style={{ letterSpacing: "0.5px" }}>EXPRESS</span>
                      </div>
                      
                      {/* Safe & Secure */}
                      <div className="w-24 h-10 rounded flex items-center gap-2 px-2" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                        <div className="flex flex-col">
                          <span className="text-black text-[8px] font-semibold leading-tight">Safe &</span>
                          <span className="text-black text-[8px] font-semibold leading-tight">Secure</span>
                        </div>
                        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: "#0C5E3E" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="mb-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                      style={{ accentColor: "#0C5E3E" }}
                    />
                    <span className="text-sm" style={{ color: "#0F172A" }}>
                      Accept terms and conditions
                    </span>
                  </label>
                  <p className="text-xs mt-2 ml-7" style={{ color: "#64748B" }}>
                    I affirm I have read & agree to the <strong>Terms & Conditions</strong> & <strong>Privacy Policy</strong>.
                  </p>
                </div>
                
                {/* Payment Timing Info */}
                <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#64748B" }} fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} fill="none" />
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">i</text>
                  </svg>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    Your card is charged AFTER the appointment is completed.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white font-bold shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transform hover:scale-[1.02]" 
                style={{ backgroundColor: "#0C5E3E" }} 
                onMouseEnter={(e)=>!isSubmitting && ((e.target as HTMLButtonElement).style.backgroundColor="#09402A")} 
                onMouseLeave={(e)=>!isSubmitting && ((e.target as HTMLButtonElement).style.backgroundColor="#0C5E3E")}
              >
                {isSubmitting ? "Sending Request..." : "Book Cleaning"}
              </button>
            </form>
            )}
              </Elements>
            ) : (
              <div className="p-8 text-center">
                <p className="text-red-600 mb-4">Payment processing is not available. Please configure Stripe.</p>
                <p className="text-sm text-gray-600">Contact support if you need assistance.</p>
              </div>
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

export default function BookPage() {
  // If BookingKoala is enabled, render BookingKoala component
  if (useBookingKoala) {
    return (
      <BookingKoala 
        mode={bookingKoalaMode}
        bookingUrl={process.env.NEXT_PUBLIC_BOOKINGKOALA_URL}
        embedCode={process.env.NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE}
        storeId={process.env.NEXT_PUBLIC_BOOKINGKOALA_STORE_ID}
      />
    );
  }

  // Otherwise, use the original custom booking form
  return <CustomBookingForm />;
}
