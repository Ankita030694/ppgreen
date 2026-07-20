'use client';

import { useState } from 'react';
import Image from 'next/image';
import Footer from '../components/footer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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

  const handleLeadSourceSelect = (source: string) => {
    setFormData((prev) => ({
      ...prev,
      leadSource: source,
      otherLeadSource: source === 'Other' ? prev.otherLeadSource : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.clientName.trim()) {
      setErrorMsg('Please enter the Client Name.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMsg('Please enter the Contact Number.');
      return;
    }
    if (!formData.clientType) {
      setErrorMsg('Please select a Client Type.');
      return;
    }
    if (formData.clientType === 'Through Broker') {
      if (!formData.brokerName.trim()) {
        setErrorMsg('Please enter the Broker Name.');
        return;
      }
      if (!formData.brokerContactNumber.trim()) {
        setErrorMsg('Please enter the Broker Contact Number.');
        return;
      }
    }
    if (formData.clientType === 'Direct Client') {
      if (!formData.leadSource) {
        setErrorMsg('Please select a Lead Source.');
        return;
      }
      if (formData.leadSource === 'Other' && !formData.otherLeadSource.trim()) {
        setErrorMsg('Please specify the other lead source.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Add data to Firestore collection "contact_inquiries"
      await addDoc(collection(db, 'contact_inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
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

  const inputClasses = "w-full bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 rounded-none py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#0C433C] focus:border-transparent transition-all shadow-xs text-sm sm:text-base";

  const leadSources = [
    'Walk-in',
    'Social Media',
    'Google Search',
    'Website',
    'Referral',
    'Hoarding',
    'Newspaper',
    'Other'
  ];

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
              <div className="bg-[#F2F7F6] p-6 sm:p-10 shadow-xs">
                {isSubmitted ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-[#0C433C]/10 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#0C433C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="px-6 py-3 bg-[#0C433C] text-white font-semibold cursor-pointer shadow-md shadow-orange-500/10"
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
                      <div className="bg-red-50 text-red-600 text-sm p-4 mb-6 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Client Name */}
                      <div className="space-y-1.5">
                        <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                          Client Name:
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          placeholder="Enter Client Name"
                          value={formData.clientName}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        />
                      </div>

                      {/* Contact Number */}
                      <div className="space-y-1.5">
                        <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                          Contact Number:
                        </label>
                        <input
                          type="tel"
                          name="contactNumber"
                          placeholder="Enter Contact Number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        />
                      </div>

                      {/* Client Type Selector */}
                      <div className="space-y-2">
                        <h4 className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                          Lead Type
                        </h4>
                        <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                          3. Client Type:
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                clientType: 'Direct Client',
                                brokerName: '',
                                brokerContactNumber: ''
                              }));
                            }}
                            className={`flex items-center gap-3 bg-white border ${
                              formData.clientType === 'Direct Client'
                                ? 'border-[#0C433C] ring-1 ring-[#0C433C]'
                                : 'border-zinc-200 hover:border-[#0C433C]/50'
                            } py-3.5 px-5 transition-all text-left w-full sm:flex-1 cursor-pointer`}
                          >
                            <span className={`w-5 h-5 flex items-center justify-center border ${
                              formData.clientType === 'Direct Client'
                                ? 'border-[#0C433C] bg-[#0C433C] text-white'
                                : 'border-zinc-300 bg-white'
                            } transition-colors`}>
                              {formData.clientType === 'Direct Client' && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className="text-zinc-800 text-sm sm:text-base font-medium">Direct Client</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                clientType: 'Through Broker',
                                leadSource: '',
                                otherLeadSource: ''
                              }));
                            }}
                            className={`flex items-center gap-3 bg-white border ${
                              formData.clientType === 'Through Broker'
                                ? 'border-[#0C433C] ring-1 ring-[#0C433C]'
                                : 'border-zinc-200 hover:border-[#0C433C]/50'
                            } py-3.5 px-5 transition-all text-left w-full sm:flex-1 cursor-pointer`}
                          >
                            <span className={`w-5 h-5 flex items-center justify-center border ${
                              formData.clientType === 'Through Broker'
                                ? 'border-[#0C433C] bg-[#0C433C] text-white'
                                : 'border-zinc-300 bg-white'
                            } transition-colors`}>
                              {formData.clientType === 'Through Broker' && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className="text-zinc-800 text-sm sm:text-base font-medium">Through Broker</span>
                          </button>
                        </div>
                      </div>

                      {/* Broker Details */}
                      {formData.clientType === 'Through Broker' && (
                        <div className="space-y-4 pt-2 border-t border-[#E5F0EE] transition-all duration-300">
                          <h4 className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                            If Through Broker
                          </h4>
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                                4. Broker Name:
                              </label>
                              <input
                                type="text"
                                name="brokerName"
                                placeholder="Enter Broker Name"
                                value={formData.brokerName}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                                5. Broker Contact Number:
                              </label>
                              <input
                                type="tel"
                                name="brokerContactNumber"
                                placeholder="Enter Broker Contact Number"
                                value={formData.brokerContactNumber}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sales Details */}
                      <div className="space-y-4 pt-2 border-t border-[#E5F0EE]">
                        <h4 className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                          Sales Details
                        </h4>
                        <div className="space-y-1.5">
                          <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                            6. Salesperson Name:
                          </label>
                          <input
                            type="text"
                            name="salespersonName"
                            placeholder="Enter Salesperson Name"
                            value={formData.salespersonName}
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Direct Client Lead Source options */}
                      {formData.clientType === 'Direct Client' && (
                        <div className="space-y-4 pt-2 border-t border-[#E5F0EE] transition-all duration-300">
                          <h4 className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                            If Direct Client
                          </h4>
                          <label className="block text-zinc-700 font-semibold text-sm sm:text-base">
                            7. Lead Source:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {leadSources.map((source) => {
                              const isSelected = formData.leadSource === source;
                              return (
                                <button
                                  key={source}
                                  type="button"
                                  onClick={() => handleLeadSourceSelect(source)}
                                  className={`flex items-center gap-3 bg-white border ${
                                    isSelected
                                      ? 'border-[#0C433C] ring-1 ring-[#0C433C]'
                                      : 'border-zinc-200 hover:border-[#0C433C]/50'
                                  } py-3 px-4 transition-all text-left w-full cursor-pointer`}
                                >
                                  <span className={`w-5 h-5 flex items-center justify-center border ${
                                    isSelected
                                      ? 'border-[#0C433C] bg-[#0C433C] text-white'
                                      : 'border-zinc-300 bg-white'
                                  } transition-colors`}>
                                    {isSelected && (
                                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </span>
                                  <span className="text-zinc-800 text-sm font-medium">{source}</span>
                                </button>
                              );
                            })}
                          </div>

                          {formData.leadSource === 'Other' && (
                            <div className="pt-2 transition-all duration-300">
                              <label className="block text-zinc-700 font-semibold text-sm sm:text-base mb-1.5">
                                Specify Other Lead Source:
                              </label>
                              <input
                                type="text"
                                name="otherLeadSource"
                                placeholder="Enter other lead source"
                                value={formData.otherLeadSource}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0C433C] text-white py-4 font-semibold hover:bg-[#09332d] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C433C] transition-all text-center cursor-pointer shadow-md shadow-orange-500/10 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed mt-6"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-[#E5F0EE]">
                  {/* Sales */}
                  <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-950 text-base sm:text-lg">Sales</h4>
                    <a
                      href="mailto:Sales@ppgreencity.com"
                      className="text-zinc-900 font-semibold text-xs sm:text-sm hover:text-[#0C433C] transition-colors mt-0.5"
                    >
                      Sales@ppgreencity.com
                    </a>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      Looking to buy your dream home or invest in a property? Contact our sales team for expert guidance.
                    </p>
                  </div>

                  {/* Customer Support */}
                  <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-950 text-base sm:text-lg">Customer Support</h4>
                    <a
                      href="mailto:Sales@ppgreencity.com"
                      className="text-zinc-900 font-semibold text-xs sm:text-sm hover:text-[#0C433C] transition-colors mt-0.5"
                    >
                      Sales@ppgreencity.com
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

