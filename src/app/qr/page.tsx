"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function QRCodePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Get the website URL
    const url = window.location.origin;
    setWebsiteUrl(url);

    // Generate QR code
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        setIsGenerating(true);
        setError(null);
        
        // Dynamically import QRCode only on client side
        const QRCode = (await import("qrcode")).default;
        
        await QRCode.toCanvas(canvasRef.current, url, {
          width: 400,
          margin: 2,
          color: {
            dark: "#0C5E3E", // Your brand green color
            light: "#ffffff",
          },
        });

        // Create download URL
        const dataUrl = canvasRef.current?.toDataURL("image/png");
        setDownloadUrl(dataUrl || null);
        setIsGenerating(false);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code. Please refresh the page.");
        setIsGenerating(false);
      }
    };

    // Small delay to ensure canvas is mounted
    const timer = setTimeout(() => {
      generateQR();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    if (downloadUrl && canvasRef.current) {
      const link = document.createElement("a");
      link.download = "goclean-usa-qr-code.png";
      link.href = downloadUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="max-w-2xl mx-auto px-8 py-12 text-center">
        <div className="bg-white rounded-3xl border shadow-lg p-10" style={{ borderColor: "#E2E8F0" }}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo2.png" 
              alt="Go Clean USA Logo" 
              width={120}
              height={120}
              className="object-cover rounded-full"
              style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(42%) saturate(540%) hue-rotate(103deg) brightness(90%) contrast(95%)" }}
            />
          </div>

          <h1 className="text-3xl font-bold mb-4" style={{ color: "#0F172A" }}>
            QR Code for Your Website
          </h1>
          
          <p className="text-lg mb-8" style={{ color: "#475569" }}>
            Scan this QR code to visit your website
          </p>

          {/* QR Code */}
          <div className="flex flex-col items-center mb-8">
            {error ? (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <>
                {isGenerating && (
                  <div className="mb-4">
                    <p className="text-sm" style={{ color: "#64748B" }}>Generating QR code...</p>
                  </div>
                )}
                <canvas 
                  ref={canvasRef} 
                  className="border-4 rounded-lg" 
                  style={{ 
                    borderColor: "#0C5E3E",
                    display: isGenerating ? "none" : "block"
                  }} 
                />
              </>
            )}
            {websiteUrl && (
              <p className="text-sm mt-4" style={{ color: "#64748B" }}>
                {websiteUrl}
              </p>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!downloadUrl || isGenerating}
            className="inline-flex items-center px-8 py-3.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#0C5E3E" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                (e.target as HTMLButtonElement).style.backgroundColor = "#0A4C32";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                (e.target as HTMLButtonElement).style.backgroundColor = "#0C5E3E";
              }
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isGenerating ? "Generating..." : "Download QR Code"}
          </button>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-block text-base font-semibold transition-colors"
            style={{ color: "#0C5E3E" }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = "#09402A";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = "#0C5E3E";
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

