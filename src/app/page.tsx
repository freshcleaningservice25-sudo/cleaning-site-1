"use client";

import QRCodeComponent from "../components/QRCode";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const bookingUrl = `${siteUrl}/book`;

  return (
    <>
      {/* Hero Section - Full Width */}
      <section className="relative h-screen w-screen flex items-center justify-start px-8" style={{ margin: 0, padding: 0, marginLeft: '-50vw', marginRight: '-50vw', left: '50%', right: '50%', width: '100vw' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/images/cleaning-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Dark overlay container */}
        <div className="relative z-10 rounded-lg p-8 max-w-xl" style={{ backgroundColor: 'rgba(31, 41, 55, 0.1)', marginLeft: '27px', marginRight: '2rem' }}>
          <div className="text-center text-black">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Go Clean
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
              Deep Cleaning, Moving Cleaning & Eco Cleaning Services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href="/book" 
                className="text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors"
                style={{ backgroundColor: '#C8E6C9' }}
              >
                BOOK NOW
              </a>
              <a 
                href="tel:+19173797224" 
                className="bg-transparent border-2 border-black text-black font-bold py-4 px-8 rounded-lg text-xl hover:bg-black hover:text-white transition-colors"
              >
                Call Now: 917 379 7224
              </a>
            </div>
            <p className="text-lg opacity-90">
              Because clean feels better
            </p>
          </div>
        </div>
      </section>

      {/* Rest of content in container */}
      <div>
        {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Cleaning Services Provided
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Offices</h3>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Retail Stores</h3>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apartment Complexes</h3>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hotels & Restaurants</h3>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Schools & Universities</h3>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Residential Homes</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="ml-2 text-sm text-gray-600">Casey Dunn</span>
              </div>
              <p className="text-gray-700 italic">
                "Very professional, prompt and thorough. Recommended!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="ml-2 text-sm text-gray-600">Noah Simpkins</span>
              </div>
              <p className="text-gray-700 italic">
                "We used this service to clean a new apartment before we moved in. The apartment was QUITE dirty, and they cleaned top to bottom. I am so impressed with the results!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="ml-2 text-sm text-gray-600">Valencia S. Shelton</span>
              </div>
              <p className="text-gray-700 italic">
                "Great Service And Great Staff And Great Price"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Book Our Cleaning Services
          </h2>
          <h3 className="text-2xl font-semibold text-center mb-16 text-gray-600">
            IN 3 SIMPLE STEPS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h4 className="text-xl font-semibold mb-4">GET QUOTE</h4>
              <p className="text-gray-600">
                Get your pricing from our associates in as little as 15 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h4 className="text-xl font-semibold mb-4">BOOK CLEAN</h4>
              <p className="text-gray-600">
                Schedule your cleaning at your convenience. We work with all schedules.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h4 className="text-xl font-semibold mb-4">YOU RELAX</h4>
              <p className="text-gray-600">
                You can sit back and enjoy that empty chores list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            A Couple of Questions For Your FREE Quote!
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            We Respond Fast! Expect A Quote In Less Than 15 Minutes!
          </p>
          
          <div className="bg-white rounded-lg p-8 text-gray-800">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">What Kind of Cleaning Do You Need?</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Deep cleaning</option>
                  <option>Move In / Move Out Cleaning</option>
                  <option>Recurring Cleaning</option>
                  <option>Post Construction Cleaning</option>
                  <option>Commercial cleaning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">How Would You Describe The Space You Need Cleaned?</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Slightly Dirty (Nothing crazy)</option>
                  <option>Pretty Dirty (It's been awhile since we cleaned, it's pretty dirty)</option>
                  <option>Very Dirty (It's a nightmare, please save me)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">How soon would you like your space cleaned?</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>ASAP (It's an emergency)</option>
                  <option>Sometime this week</option>
                  <option>Sometime next week</option>
                  <option>No Rush</option>
                  <option>Not Sure (Just price shopping)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">What is the address of the property you'd like cleaned?</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter property address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">Prefer to call?</p>
            <p className="text-xl mb-4">We're available every day from 7 am to 11 pm!</p>
            <a 
              href="tel:+1234567890" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-white hover:text-black transition-colors inline-block"
            >
              Call Now: (123) 456-7890
            </a>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Book Your Cleaning
          </h2>
        <QRCodeComponent url={bookingUrl} size={250} />
        <div className="mt-6">
          <a 
            href="/book" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-block"
          >
            Or click here to book online
          </a>
        </div>
          <div className="text-sm text-gray-500 mt-6">
        <p>Scan the QR code with your phone camera to book instantly</p>
      </div>
    </div>
      </section>
      </div>
    </>
  );
}
