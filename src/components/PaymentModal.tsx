"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

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
    time?: string;
    ecoCleaning: boolean;
    additionalServices?: string[];
    serviceType: string;
    duration: string;
    service: string;
    message: string;
  };
  requestId?: string | null;
}

// Inner component that uses Stripe hooks
function CheckoutForm({ price, onClose }: { 
  price: number,
  onClose: () => void 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred");
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        alert("Payment successful! Redirecting...");
        onClose();
        window.location.href = `${window.location.origin}/payment-success`;
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
        style={{ backgroundColor: "#419544" }}
      >
        {isProcessing ? "Processing..." : `Pay $${(price / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

export default function PaymentModal({ isOpen, onClose, serviceData, requestId }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Additional services pricing and names
  const additionalServicesPricing: Record<string, number> = {
    oven: 3800, // $38
    refrigerator: 3800, // $38
    cabinets: 4000, // $40
    microwave: 1600, // $16
    windows: 4900, // $49
    blinds: 1100, // $11
    balcony: 3200, // $32
    laundry: 2200, // $22
  };

  const additionalServicesNames: Record<string, string> = {
    oven: "Inside the oven",
    refrigerator: "Inside the refrigerator",
    cabinets: "Inside kitchen cabinets",
    microwave: "Inside the microwave",
    windows: "Windows from inside (up to 6 pcs)",
    blinds: "Blinds/slats",
    balcony: "Balcony/Patio",
    laundry: "Washing/Drying/Folding",
  };

  // Calculate price based on bedrooms, bathrooms, eco cleaning, and additional services
  const calculatePrice = () => {
    if (!serviceData?.bedrooms || !serviceData?.bathrooms) return 13900; // Default $139

    const bedrooms = serviceData.bedrooms;
    const bathrooms = serviceData.bathrooms;
    const ecoCleaning = serviceData.ecoCleaning || false;
    const additionalServices = serviceData.additionalServices || [];

    let basePrice = 0;

    // Pricing based on bedrooms and bathrooms
    if (bedrooms === 1 && bathrooms === 1) {
      basePrice = 13900; // $139
    } else if (bedrooms === 2 && bathrooms === 1) {
      basePrice = 16900; // $169
    } else if (bedrooms === 3 && bathrooms === 2) {
      basePrice = 21900; // $219
    } else {
      // For other combinations, calculate based on size
      // Base: $139 for 1 bed/1 bath
      // Additional bedroom: +$30
      // Additional bathroom: +$20
      basePrice = 13900 + ((bedrooms - 1) * 3000) + ((bathrooms - 1) * 2000);
    }

    // Add 10% premium for eco cleaning
    if (ecoCleaning) {
      basePrice = Math.round(basePrice * 1.1);
    }

    // Add additional services prices
    additionalServices.forEach((serviceId: string) => {
      if (additionalServicesPricing[serviceId]) {
        basePrice += additionalServicesPricing[serviceId];
      }
    });
    
    return basePrice;
  };

  const price = calculatePrice();
  const priceInDollars = (price / 100).toFixed(2);

  // Create payment intent when modal opens
  useEffect(() => {
    if (isOpen && !clientSecret) {
      setIsLoading(true);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          serviceData: serviceData,
          requestId: requestId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            alert(data.error || "Failed to create payment intent");
            onClose();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to initialize payment");
          onClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, price, serviceData, requestId, clientSecret, onClose]);

  if (!isOpen) return null;

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe',
    },
  };

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
              {serviceData?.serviceType || "Regular"}
            </p>
            <p className="text-sm text-gray-600">
              {serviceData?.service || "Residential Cleaning"}
            </p>
            {serviceData?.ecoCleaning && (
              <p className="text-sm font-medium" style={{ color: "#419544" }}>
                🌿 Organic Cleaning Enabled
              </p>
            )}
            {serviceData?.additionalServices && serviceData.additionalServices.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Additional Services:</p>
                {serviceData.additionalServices.map((serviceId: string) => (
                  <p key={serviceId} className="text-sm text-gray-600 ml-2">
                    • {additionalServicesNames[serviceId] || serviceId} (+${((additionalServicesPricing[serviceId] || 0) / 100).toFixed(2)})
                  </p>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600">
              {serviceData?.bedrooms} bedrooms, {serviceData?.bathrooms} bathrooms
            </p>
            <p className="text-sm text-gray-600">
              {serviceData?.date}{serviceData?.time ? ` at ${serviceData.time}` : ''}
            </p>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span style={{ color: "#419544" }}>${priceInDollars}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading payment form...</p>
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
              price={price}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <div className="text-center py-8 text-red-600">
            <p>Failed to load payment form</p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
