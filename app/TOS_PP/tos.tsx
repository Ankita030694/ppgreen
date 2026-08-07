'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/footer';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'sec1', label: '1. Use of the Website' },
  { id: 'sec2', label: '2. Property Information' },
  { id: 'sec3', label: '3. Enquiries and Communication' },
  { id: 'sec4', label: '4. Intellectual Property' },
  { id: 'sec5', label: '5. Third-Party Links' },
  { id: 'sec6', label: '6. Website Availability' },
  { id: 'sec7', label: '7. Limitation of Liability' },
  { id: 'sec8', label: '8. Changes to These Terms' },
  { id: 'sec9', label: '9. Governing Law' },
  { id: 'sec10', label: '10. Contact Us' },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full min-h-screen bg-white text-[#0C433C] flex flex-col pt-28 sm:pt-36">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pb-24">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 hover:text-[#0C433C] transition-colors uppercase mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Header Block matching screenshot design */}
        <div className="mb-14">
          <span className="text-xs font-bold tracking-widest text-[#0C433C] uppercase mb-2 block">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0C433C] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[#0C433C]/60 text-sm sm:text-base mt-3">
            Last Updated: March 2026 | Effective for all users and visitors of PP Green City.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Table of Contents */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 bg-zinc-50/80 p-6 border border-zinc-100 rounded-none shadow-xs">
            <h4 className="text-xs font-bold tracking-widest text-[#0C433C]/50 uppercase mb-4 select-none">
              TABLE OF CONTENTS
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left py-1.5 px-3 transition-all duration-200 cursor-pointer ${
                    activeSection === sec.id
                      ? 'text-[#0C433C] font-semibold border-l-2 border-[#0C433C] bg-white shadow-2xs'
                      : 'text-zinc-500 hover:text-[#0C433C] border-l-2 border-transparent hover:border-[#0C433C]/35'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column: Article Content */}
          <div className="lg:col-span-8 flex flex-col gap-14 text-[#0C433C]/80 leading-relaxed text-base">
            
            {/* Introduction */}
            <section id="intro" className="scroll-mt-28 flex flex-col gap-4">
              <p className="text-lg text-[#0C433C] font-normal leading-relaxed">
                Welcome to the official website of <strong className="text-[#0C433C] font-semibold">PP Green City</strong> (“we”, “us”, “our” or “the Company”). By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using the website.
              </p>
            </section>

            {/* Section 1 */}
            <section id="sec1" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 01"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Use of the Website
                </h2>
              </div>
              <p>
                This website is intended to provide general information about PP Green City, its projects, properties, services and related offerings. You agree to use the website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec2" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 02"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Property Information
                </h2>
              </div>
              <p>
                While we make reasonable efforts to ensure that the information published on this website is accurate and up to date, property details, specifications, images, amenities, prices, availability, timelines and other project-related information may be subject to change without prior notice.
              </p>
              <p>
                Information on this website should not be considered a substitute for official project documentation, legal agreements or other formal communications issued by PP Green City.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec3" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 03"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Enquiries and Communication
                </h2>
              </div>
              <p>
                By submitting an enquiry, contact form or other information through this website, you consent to being contacted by representatives of PP Green City regarding your enquiry, our projects or related services.
              </p>
              <p>
                Any information provided through the website is subject to verification and does not constitute a binding offer, commitment or contractual agreement unless expressly confirmed in writing.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec4" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 04"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Intellectual Property
                </h2>
              </div>
              <p>
                All content available on this website, including text, images, graphics, logos, designs, videos, photographs and other materials, is owned by or licensed to PP Green City and is protected under applicable intellectual property laws.
              </p>
              <p>
                No content may be reproduced, copied, modified, distributed or commercially used without prior written permission from PP Green City.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec5" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 05"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Third-Party Links
                </h2>
              </div>
              <p>
                This website may contain links to third-party websites or resources for convenience. PP Green City does not control or endorse such websites and is not responsible for their content, availability, privacy practices or terms of use.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec6" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 06"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Website Availability
                </h2>
              </div>
              <p>
                We do not guarantee that the website will always be available, uninterrupted, secure or free from errors. We reserve the right to modify, suspend or discontinue any part of the website without prior notice.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec7" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 07"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Limitation of Liability
                </h2>
              </div>
              <p>
                To the extent permitted by applicable law, PP Green City shall not be liable for any direct, indirect, incidental or consequential loss arising from the use of, or reliance upon, information available on this website.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec8" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 08"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Changes to These Terms
                </h2>
              </div>
              <p>
                PP Green City reserves the right to update or modify these Terms of Service from time to time. Any changes will be effective upon being published on this website. Continued use of the website following such changes constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec9" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 09"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Governing Law
                </h2>
              </div>
              <p>
                These Terms of Service shall be governed by and interpreted in accordance with the applicable laws of India. Any disputes arising in connection with these terms shall be subject to the jurisdiction of the applicable courts in India.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec10" className="scroll-mt-28 flex flex-col gap-4 pt-4 border-t border-zinc-200">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 10"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Contact Us
                </h2>
              </div>
              <p>
                For any questions regarding these Terms of Service, please contact us through the contact details provided on this website:
              </p>
              <div className="bg-[#F2F7F6] p-6 border-l-4 border-[#0C433C] flex flex-col gap-1 text-sm">
                <span className="font-semibold text-[#0C433C]">PP Green City Customer Support & Legal</span>
                <span className="text-[#0C433C]/80">Email: Sales@ppgreencity.com</span>
                <span className="text-[#0C433C]/80">Address: Sector 83 and 84, Main GT Road, Kumashpur, Sonipat, Haryana 131001</span>
              </div>
            </section>

          </div>

        </div>

      </div>

      {/* Footer Component */}
      <Footer />
    </main>
  );
}