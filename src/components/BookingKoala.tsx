"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// New BookingKoala embed (booknow, embed params, 1000px height, scrolling=no)
// NOTE: BookingKoala expects the mobile offset param to be `OffsetTopM` (capital O/T/M)
// We start with 140px for mobile; tweak this as needed based on where the calendar appears.
const DEFAULT_BOOKINGKOALA_URL = "https://gocleanusausa.bookingkoala.com/booknow?embed=true&bar=false&offsetTop=0&OffsetTopM=140";
const DEFAULT_BOOKINGKOALA_EMBED_CODE = '<iframe src="https://gocleanusausa.bookingkoala.com/booknow?embed=true&bar=false&offsetTop=0&offsetTopM=-300&summaryOffset=0" style="border:none;height:1000px" width="100%" scrolling="no"></iframe><script src="https://gocleanusausa.bookingkoala.com/resources/embed.js" defer></script>';

interface BookingKoalaProps {
  mode?: "embed" | "redirect" | "iframe";
  bookingUrl?: string;
  embedCode?: string;
  storeId?: string;
}

export default function BookingKoala({ 
  mode = "redirect", 
  bookingUrl,
  embedCode
}: BookingKoalaProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resolvedMode, setResolvedMode] = useState<"embed" | "redirect" | "iframe">(mode);
  
  // Get BookingKoala URL from environment, props, or use new embed default
  const defaultBookingUrl = process.env.NEXT_PUBLIC_BOOKINGKOALA_URL || bookingUrl || DEFAULT_BOOKINGKOALA_URL;
  const defaultEmbedCode = process.env.NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE || embedCode || DEFAULT_BOOKINGKOALA_EMBED_CODE;

  // Extract script src from embed code if present (for embed mode)
  const scriptMatch = defaultEmbedCode?.match(/<script[^>]+src=["']([^"']+)["'][^>]*>/i);
  const scriptSrc = scriptMatch ? scriptMatch[1] : null;

  // Resolve mode differently on mobile: if iframe is requested, prefer redirect for better UX
  // This avoids calendar pop-up positioning issues inside iframes on small screens.
  useEffect(() => {
    if (mode === "iframe") {
      if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        const isSmallScreen = window.innerWidth <= 768;
        const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isSmallScreen || isMobileUA) {
          setResolvedMode("redirect");
          return;
        }
      }
      setResolvedMode("iframe");
    } else {
      setResolvedMode(mode);
    }
  }, [mode]);

  // All hooks must be called at the top level before any conditional returns
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // If redirect mode, redirect immediately
    if (resolvedMode === "redirect" && defaultBookingUrl) {
      window.location.href = defaultBookingUrl;
      return;
    }
  }, [resolvedMode, defaultBookingUrl]);

  // Load embed script dynamically if in embed mode
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (resolvedMode === "embed" && scriptSrc) {
      // Check if script already exists to avoid duplicates
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup: remove script on unmount
        const scriptToRemove = document.querySelector(`script[src="${scriptSrc}"]`);
        if (scriptToRemove && scriptToRemove.parentNode) {
          scriptToRemove.parentNode.removeChild(scriptToRemove);
        }
      };
    }
  }, [resolvedMode, scriptSrc]);

  // Load BookingKoala embed script for iframe mode
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (resolvedMode === "iframe" && defaultBookingUrl) {
      const embedScriptSrc = "https://gocleanusausa.bookingkoala.com/resources/embed.js";
      // Check if script already exists to avoid duplicates
      const existingScript = document.querySelector(`script[src="${embedScriptSrc}"]`);
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = embedScriptSrc;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup: remove script on unmount
        const scriptToRemove = document.querySelector(`script[src="${embedScriptSrc}"]`);
        if (scriptToRemove && scriptToRemove.parentNode) {
          scriptToRemove.parentNode.removeChild(scriptToRemove);
        }
      };
    }
  }, [resolvedMode, defaultBookingUrl]);

  // If redirect mode, show loading state
  if (resolvedMode === "redirect") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4 animate-spin">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: "#669966" }}>Redirecting to Booking...</h3>
          <p className="text-lg" style={{ color: "#475569" }}>
            Please wait while we redirect you to our booking system.
          </p>
        </div>
      </div>
    );
  }

  // Iframe mode - embed BookingKoala booking page (booknow, bar=false, offsetTop, 1000px, scrolling=no)
  if (resolvedMode === "iframe" && defaultBookingUrl) {
    const iframeSrc = defaultBookingUrl.includes("embed=true")
      ? defaultBookingUrl
      : `${defaultBookingUrl}${defaultBookingUrl.includes("?") ? "&" : "?"}embed=true`;

    return (
      <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF8F4" }}>
        {/* Header - Same as main page - Pinned at top */}
        <header className="fixed top-0 left-0 right-0 z-[50] backdrop-blur-sm shadow-sm" style={{ backgroundColor: "#FAF8F4", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transform: "translateZ(0)", willChange: "transform" }}>
          <div className="w-full px-3 sm:px-4 md:px-6 py-1 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Go Clean USA - Home">
              <div className="logo-crop w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[90px] lg:h-[90px]">
                <Image
                  src="/logo_2.svg"
                  alt="Go Clean USA Logo"
                  width={90}
                  height={90}
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
            
            {/* Desktop Navigation and CTA */}
            <div className="hidden lg:flex items-center gap-12">
              <nav className="flex items-center gap-16 text-base">
                <Link 
                  href="/#hero" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/#services" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/#approach" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Our Approach
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/contact" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
              </nav>
              
              {/* Social Media & Contact Icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/people/Go-Clean-Chicago/61584054026967/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow Go Clean Chicago on Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/goclean.chicago?igsh=cjZ1dTVuamExOGRq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow Go Clean Chicago on Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
              
              <Link 
                href="/book" 
                className="inline-flex items-center px-8 py-3.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex-shrink-0" 
                style={{ backgroundColor: "#669966", fontSize: "15px", letterSpacing: "0.01em" }}
                onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#347737")} 
                onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#669966")}
              >
                Book Cleaning
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
              style={{ backgroundColor: "#669966" }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FAF8F4" }}>
              <nav className="flex flex-col px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
                <Link 
                  href="/#hero" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  About Us
                </Link>
                <Link 
                  href="/#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Services
                </Link>
                <Link 
                  href="/#approach" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Our Approach
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 pt-2">
                  <a 
                    href="/contact" 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Call us"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <a 
                    href="/contact" 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Email us"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Follow us on TikTok"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
                <Link 
                  href="/book" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all"
                  style={{ backgroundColor: "#669966" }}
                >
                  Book Cleaning
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Spacer to prevent content from going under header */}
        <div className="h-32 sm:h-40 md:h-44 lg:h-48 w-full bg-transparent flex-shrink-0 relative z-10"></div>
        
        {/* BookingKoala Iframe - booknow embed, 1000px height, scrolling=no */}
        <div className="w-full relative min-h-screen sm:min-h-[800px] md:min-h-[900px] lg:min-h-[1000px] mt-0 pt-0 z-10 isolate px-0 sm:px-2 md:px-4" style={{ pointerEvents: "none", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <iframe
            src={iframeSrc}
            className="w-full border-0"
            style={{ border: "none", height: 1000, position: "relative", zIndex: 1, display: "block", pointerEvents: "auto", touchAction: "pan-y pan-x" }}
            title="BookingKoala Booking Form"
            allow="payment"
            loading="lazy"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // Embed code mode - use provided embed script
  if (resolvedMode === "embed" && defaultEmbedCode) {
    // Extract iframe HTML (everything except script tags)
    const iframeHtml = defaultEmbedCode.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();

    return (
      <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: "#FAF8F4" }}>
        {/* Header - Pinned at top */}
        <header className="fixed top-0 left-0 right-0 z-[50] backdrop-blur-sm shadow-sm" style={{ backgroundColor: "#FAF8F4", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
          <div className="w-full px-3 sm:px-4 md:px-6 py-1 flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" aria-label="Go Clean USA - Home">
              <div className="logo-crop w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[90px] lg:h-[90px]">
                <Image 
                  src="/logo_2.svg" 
                  alt="Go Clean USA Logo" 
                  width={90}
                  height={90}
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
            
            {/* Desktop Navigation and CTA */}
            <div className="hidden lg:flex items-center gap-12">
              <nav className="flex items-center gap-16 text-base">
                <Link 
                  href="/#hero" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/#services" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/#approach" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Our Approach
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
                <Link 
                  href="/contact" 
                  className="font-semibold uppercase tracking-wide transition-all duration-200 relative py-2 group" 
                  style={{ color: "#1F2937" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#669966";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1F2937";
                  }}
                >
                  <span className="relative">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: "#669966" }}></span>
                  </span>
                </Link>
              </nav>
              
              {/* Social Media & Contact Icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="/contact" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/people/Go-Clean-Chicago/61584054026967/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow Go Clean Chicago on Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/goclean.chicago?igsh=cjZ1dTVuamExOGRq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow Go Clean Chicago on Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md" 
                  style={{ backgroundColor: "#669966" }}
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
              
              <Link 
                href="/book" 
                className="inline-flex items-center px-8 py-3.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex-shrink-0" 
                style={{ backgroundColor: "#669966", fontSize: "15px", letterSpacing: "0.01em" }}
                onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#347737")} 
                onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#669966")}
              >
                Book Cleaning
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
              style={{ backgroundColor: "#669966" }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FAF8F4" }}>
              <nav className="flex flex-col px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
                <Link 
                  href="/#hero" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  About Us
                </Link>
                <Link 
                  href="/#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Services
                </Link>
                <Link 
                  href="/#approach" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Our Approach
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold uppercase tracking-wide py-2 transition-colors"
                  style={{ color: "#1F2937" }}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 pt-2">
                  <a 
                    href="/contact" 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Call us"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <a 
                    href="/contact" 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Email us"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/people/Go-Clean-Chicago/61584054026967/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Follow Go Clean Chicago on Facebook"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/goclean.chicago?igsh=cjZ1dTVuamExOGRq" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Follow Go Clean Chicago on Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@gocleanusa.com?_r=1&_t=ZP-91TOV6iSNzS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: "#669966" }}
                    aria-label="Follow us on TikTok"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
                <Link 
                  href="/book" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all"
                  style={{ backgroundColor: "#669966" }}
                >
                  Book Cleaning
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Embed Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 mt-24 sm:mt-32 md:mt-40 lg:mt-48 pt-4 sm:pt-8">
          <div 
            id="bookingkoala-embed"
            className="w-full overflow-x-auto"
            style={{ minHeight: '600px', pointerEvents: "auto" }}
            dangerouslySetInnerHTML={{ __html: iframeHtml }}
          />
        </div>
      </div>
    );
  }

  // Fallback - configuration needed
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="max-w-2xl mx-auto px-8 text-center">
        <div className="bg-white rounded-3xl border shadow-lg p-10" style={{ borderColor: "#E2E8F0" }}>
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>BookingKoala Configuration Required</h3>
          <p className="text-lg mb-6" style={{ color: "#475569" }}>
            To use BookingKoala, you need to configure your booking URL or embed code.
          </p>
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-6" style={{ backgroundColor: "#F8FAFC" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "#0F172A" }}>Setup Instructions:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm" style={{ color: "#475569" }}>
              <li>Sign up for BookingKoala at <a href="https://www.bookingkoala.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">bookingkoala.com</a></li>
              <li>Get your booking URL or embed code from your BookingKoala dashboard</li>
              <li>Add one of these environment variables to your <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:</li>
            </ol>
              <div className="mt-4 space-y-2 text-xs font-mono bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
              <div># For redirect or iframe (uses booknow, embed params):</div>
              <div>NEXT_PUBLIC_BOOKINGKOALA_URL=https://gocleanusausa.bookingkoala.com/booknow?embed=true&amp;bar=false&amp;offsetTop=0&amp;OffsetTopM=140</div>
              <div className="mt-3"># For embed code mode (iframe + script):</div>
              <div>NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE={"{`<iframe src=\"...booknow?embed=true&bar=false&offsetTop=0&OffsetTopM=140\" ...></iframe><script src=\".../embed.js\" defer></script>`}"}</div>
            </div>
          </div>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: "#669966" }}
            onMouseEnter={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#347737")} 
            onMouseLeave={(e)=>((e.target as HTMLAnchorElement).style.backgroundColor="#669966")}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    );
}

