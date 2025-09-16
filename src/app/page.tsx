"use client";

import QRCodeComponent from "../components/QRCode";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const bookingUrl = `${siteUrl}/book`;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Fresh Cleaning</h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional home cleaning services
        </p>
      </header>

      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-6">Book Your Cleaning</h2>
        <QRCodeComponent url={bookingUrl} size={250} />
        <div className="mt-6">
          <a 
            href="/book" 
            className="btn text-lg px-8 py-3"
          >
            Or click here to book online
          </a>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Scan the QR code with your phone camera to book instantly</p>
      </div>
    </div>
  );
}
