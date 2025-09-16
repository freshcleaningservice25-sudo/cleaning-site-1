"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ServiceType =
  | "1 bedroom, 1 bathroom"
  | "2 bedrooms, 1 bathroom"
  | "3 bedrooms, 2 bathrooms";

type CleaningHours = "2 hours" | "3 hours" | "4 hours";

export default function BookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const search = useSearchParams();
  const submitted = search.get("success") === "1";
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 16), []);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const payload = Object.fromEntries(formData.entries());
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl as string;
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="card" role="status" aria-live="polite">
          <h1 className="text-2xl font-semibold mb-2">Booking received 🎉</h1>
          <p className="text-black/70">
            Thanks for choosing Fresh. We7ll text or email a confirmation shortly.
          </p>
          <a href="/book" className="btn mt-4 inline-block">Book another</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Book a cleaning</h1>
        <p className="text-black/60 mt-1">
          Simple, transparent pricing. Pay securely after you confirm.
        </p>
      </header>

      <form action={handleSubmit} className="grid gap-5">
        <section className="card grid gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label className="label" htmlFor="firstName">First name</label>
              <input className="input" id="firstName" name="firstName" required placeholder="Jane" />
            </div>
            <div className="field">
              <label className="label" htmlFor="lastName">Last name</label>
              <input className="input" id="lastName" name="lastName" required placeholder="Doe" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <input className="input" id="phone" name="phone" type="tel" required placeholder="(555) 555-1234" />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <input className="input" id="email" name="email" type="email" required placeholder="jane@example.com" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="address">Service address</label>
            <input className="input" id="address" name="address" required placeholder="123 Main St, City, ST" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label className="label" htmlFor="service">Service type</label>
              <select className="input" id="service" name="service" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>1 bedroom, 1 bathroom</option>
                <option>2 bedrooms, 1 bathroom</option>
                <option>3 bedrooms, 2 bathrooms</option>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="hours">How many hours</label>
              <select className="input" id="hours" name="hours" required defaultValue="">
                <option value="" disabled>
                  Select hours
                </option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label className="label" htmlFor="datetime">Date & time</label>
              <input
                className="input"
                id="datetime"
                name="datetime"
                type="datetime-local"
                min={todayStr}
                required
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="notes">Additional notes</label>
              <textarea className="textarea" id="notes" name="notes" placeholder="Any instructions or access details" />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between">
          <p className="text-black/60 text-sm">
            By continuing, you agree to our terms and privacy policy.
          </p>
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Confirm booking"}
          </button>
        </div>
      </form>
    </div>
  );
}


