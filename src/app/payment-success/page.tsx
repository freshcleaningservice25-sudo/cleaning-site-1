"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    if (paymentIntent) {
      setPaymentStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for booking with Go Clean USA. We'll contact you soon to confirm your cleaning appointment.
        </p>
        <div className="space-y-3">
          <a 
            href="/"
            className="block w-full py-3 px-6 rounded-2xl text-white font-semibold transition"
            style={{ backgroundColor: "#4CAF50" }}
          >
            Return to Home
          </a>
          <a 
            href="tel:+19173797224"
            className="block w-full py-3 px-6 rounded-2xl border text-gray-700 font-semibold transition"
            style={{ borderColor: "#4CAF50", color: "#4CAF50" }}
          >
            Call Us: 917 379 7224
          </a>
        </div>
      </div>
    </div>
  );
}
