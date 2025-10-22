"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51S86DSDfH7qBRYLsbJQWIHFFCFTtdK2T5p34MLRDLh5Ugu4vQlN3SoFpNpi6YGTTQHADJTtO26fWi5SRMJUMnI0W00qTJGAxcC");

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    bedrooms: number;
    bathrooms: number;
    date: string;
    time: string;
    serviceType: string;
    duration: string;
    service: string;
    message: string;
  };
}

export default function PaymentModal({ isOpen, onClose, serviceData }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate price based on service type and duration
  const calculatePrice = () => {
    if (!serviceData?.serviceType || !serviceData?.duration) return 15000; // Default $150

    const serviceType = serviceData.serviceType;
    const duration = serviceData.duration;

    // Pricing logic based on service type and duration
    if (serviceType === "Regular") {
      return duration === "2.5 hours" ? 12500 : 18900; // $125 or $189
    } else if (serviceType === "Deep") {
      return duration === "2.5 hours" ? 18900 : 25000; // $189 or $250
    } else if (serviceType === "Move-in/out") {
      return duration === "2.5 hours" ? 25000 : 40000; // $250 or $400
    } else if (serviceType === "Junk Removal") {
      return duration === "2.5 hours" ? 10000 : 30000; // $100 or $300
    } else if (serviceType === "Windows") {
      return duration === "2.5 hours" ? 12000 : 20000; // $120 or $200
    }
    
    return 15000; // Default fallback
  };

  const price = calculatePrice();
  const priceInDollars = (price / 100).toFixed(2);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const stripe = await stripePromise;
      
      // Create a payment intent on your server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price, // Dynamic price based on service type and duration
          serviceData: serviceData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error("No client secret received");
      }

      // Confirm the payment
      const result = await stripe?.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (result?.error) {
        console.error("Payment failed:", result.error);
        alert(`Payment failed: ${result.error.message || "Unknown error"}`);
      } else {
        // Payment succeeded
        onClose();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Your Booking</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">Service Summary</h3>
            <p className="text-sm text-gray-600">
              {serviceData?.serviceType || "Regular"} - {serviceData?.duration || "2.5 hours"}
            </p>
            <p className="text-sm text-gray-600">
              {serviceData?.service || "Residential Cleaning"}
            </p>
            <p className="text-sm text-gray-600">
              {serviceData?.bedrooms} bedrooms, {serviceData?.bathrooms} bathrooms
            </p>
            <p className="text-sm text-gray-600">
              {serviceData?.date} at {serviceData?.time}
            </p>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span style={{ color: "#4CAF50" }}>${priceInDollars}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl text-white font-semibold shadow transition text-lg disabled:opacity-50"
          style={{ backgroundColor: "#4CAF50" }}
        >
          {isProcessing ? "Processing..." : `Pay $${priceInDollars}`}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
