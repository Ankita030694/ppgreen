'use client';

import { useState } from 'react';
import Image from 'next/image';
import Footer from '../components/footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    clientName: '',
    contactNumber: '',
    clientType: '',
    brokerName: '',
    brokerContactNumber: '',
    salespersonName: '',
    leadSource: '',
    otherLeadSource: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic validation
    if (!formData.clientName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMsg('Please enter your contact number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({
        clientName: '',
        contactNumber: '',
        clientType: '',
        brokerName: '',
        brokerContactNumber: '',
        salespersonName: '',
        leadSource: '',
        otherLeadSource: '',
      });
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-100 rounded-none py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-all shadow-xs text-sm sm:text-base";

  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to verify module status and support standard imports.
      */}

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[85vh] bg-black overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Contact_Us/1.svg"
            alt="Get In Touch"
            fill
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority
          />
        </div>
        
        {/* Darkening Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45 z-0" />

        {/* Hero Title */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="text-white font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] leading-none tracking-tight">
            Get In Touch
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full bg-white py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Let's Talk & Sketch */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full lg:sticky lg:top-2">
              {/* Tagline */}
              <div className="flex items-center gap-1">
                <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
                <span className="text-black/60 font-semibold tracking-widest text-xs sm:text-sm">
                  {"Let's Talk"}
                </span>
              </div>
              
              {/* Left Subtitle */}
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xs">
                Have a property in mind? Let us know how we can help you find the right opportunity.
              </p>
              
              {/* Sketch Building Image */}
              <div className="relative hidden lg:block w-full aspect-[4/3] max-w-md mx-auto lg:mx-0 mt-4 md:mt-8">
                <Image
                  src="/back_Sketch.svg"
                  alt="Architectural Building Sketch"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-contain opacity-70 select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                  priority={false}
                />
              </div>
            </div>

            {/* Right Column: Heading & Form Container */}
            <div className="lg:col-span-7 flex flex-col pt-2 lg:pt-0">
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight mb-4">
                Connect with our real estate experts to find your perfect property.
              </h2>
              
              {/* Subtitle */}
              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                {"Whether you're buying, selling, investing, or looking for your dream home, our team is here to provide expert guidance and personalized support every step of the way."}
              </p>

              {/* Form Box */}
              <div className="bg-[#FFF7F2]  p-6 sm:p-10 shadow-xs">
                {isSubmitted ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-[#FF6A00]/10 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-zinc-600 max-w-md mb-8">
                      Thank you for reaching out. Our real estate experts will connect with you shortly to provide personalized support.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-[#FF6A00] text-white font-semibold cursor-pointer shadow-md shadow-orange-500/10"
                    >
                      Send Another Message 
                    </button>
                  </div>
                ) : (
                  /* Form State */
                  <>
                    {/* Form Message */}
                    <h3 className="text-zinc-900 font-medium text-lg sm:text-xl mb-6">
                      {"Leave us a message here, and we'll reach out with personalized support."}
                    </h3>

                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 text-sm p-4  mb-6 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Client Name */}
                      <div>
                        <input
                          type="text"
                          name="clientName"
                          placeholder="Client Name"
                          value={formData.clientName}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        />
                      </div>

                      {/* Contact Number */}
                      <div>
                        <input
                          type="tel"
                          name="contactNumber"
                          placeholder="Contact Number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        />
                      </div>

                      {/* Client Type */}
                      <div className="relative">
                        <select
                          name="clientType"
                          value={formData.clientType}
                          onChange={handleChange}
                          className={`${inputClasses} appearance-none cursor-pointer ${
                            formData.clientType === "" ? "text-zinc-400" : "text-zinc-800"
                          }`}
                          required
                        >
                          <option value="" disabled hidden>Client Type</option>
                          <option value="Direct Client">Direct Client</option>
                          <option value="Broker">Broker</option>
                          <option value="Investor">Investor</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Broker Name */}
                      <div>
                        <input
                          type="text"
                          name="brokerName"
                          placeholder="Broker Name"
                          value={formData.brokerName}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>

                      {/* Broker Contact Number */}
                      <div>
                        <input
                          type="tel"
                          name="brokerContactNumber"
                          placeholder="Broker Contact Number"
                          value={formData.brokerContactNumber}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>

                      {/* Salesperson Name */}
                      <div>
                        <input
                          type="text"
                          name="salespersonName"
                          placeholder="Salesperson Name"
                          value={formData.salespersonName}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>

                      {/* Lead Source */}
                      <div className="relative">
                        <select
                          name="leadSource"
                          value={formData.leadSource}
                          onChange={handleChange}
                          className={`${inputClasses} appearance-none cursor-pointer ${
                            formData.leadSource === "" ? "text-zinc-400" : "text-zinc-800"
                          }`}
                        >
                          <option value="" disabled hidden>Lead Source</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Referral">Referral</option>
                          <option value="Newspaper/Billboard">Newspaper/Billboard</option>
                          <option value="Property Portal">Property Portal</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Other Lead Source */}
                      <div>
                        <input
                          type="text"
                          name="otherLeadSource"
                          placeholder="Other Lead Source"
                          value={formData.otherLeadSource}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#FF6A00] text-white py-4  font-semibold hover:bg-[#E05B00] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6A00] transition-all text-center cursor-pointer shadow-md shadow-orange-500/10 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </form>
                  </>
                )}

                {/* Footer details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-[#FFF0E5]">
                  {/* Sales */}
                  <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-950 text-base sm:text-lg">Sales</h4>
                    <a
                      href="mailto:sales@yourrealestate.com"
                      className="text-zinc-900 font-semibold text-xs sm:text-sm hover:text-[#FF6A00] transition-colors mt-0.5"
                    >
                      sales@yourrealestate.com
                    </a>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      Looking to buy your dream home or invest in a property? Contact our sales team for expert guidance.
                    </p>
                  </div>

                  {/* Customer Support */}
                  <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-950 text-base sm:text-lg">Customer Support</h4>
                    <a
                      href="mailto:support@yourrealestate.com"
                      className="text-zinc-900 font-semibold text-xs sm:text-sm hover:text-[#FF6A00] transition-colors mt-0.5"
                    >
                      support@yourrealestate.com
                    </a>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      Need help with bookings, documentation, site visits, or existing projects? Our support team is here to assist you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

