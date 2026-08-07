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
  { id: 'sec1', label: '1. Information We Collect' },
  { id: 'sec2', label: '2. How We Use Your Information' },
  { id: 'sec3', label: '3. Sharing of Information' },
  { id: 'sec4', label: '4. Data Security' },
  { id: 'sec5', label: '5. Third-Party Links' },
  { id: 'sec6', label: '6. Your Rights' },
  { id: 'sec7', label: "7. Children's Privacy" },
  { id: 'sec8', label: '8. Communication & DND Disclaimer' },
  { id: 'sec9', label: '9. Changes to This Policy' },
  { id: 'sec10', label: '10. Contact Us' },
];

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-[#0C433C]/60 text-sm sm:text-base mt-3">
            Last Updated: March 2026 | Dedicated to protecting your personal information and data privacy.
          </p>
        </div>

        {/* 2-Column Layout */}
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

          {/* Right Column: Content */}
          <div className="lg:col-span-8 flex flex-col gap-14 text-[#0C433C]/80 leading-relaxed text-base">
            
            {/* Introduction */}
            <section id="intro" className="scroll-mt-28 flex flex-col gap-4">
              <p className="text-lg text-[#0C433C] font-normal leading-relaxed">
                At <strong className="text-[#0C433C] font-semibold">PP Green City</strong>, your privacy is one of our top priorities. This Privacy Policy outlines the types of information we collect, how it is used, and the measures we take to safeguard your data. By using our website, you agree to the terms of this Privacy Policy.
              </p>
            </section>

            {/* Section 1 */}
            <section id="sec1" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 01"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Information We Collect
                </h2>
              </div>
              
              <h3 className="font-semibold text-[#0C433C] text-lg mt-2">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-1.5 text-[#0C433C]/80">
                <li>Name, email address, phone number and any other details you submit via contact forms.</li>
                <li>Details of property preferences, budgets or transaction requirements you share with us.</li>
              </ul>
              
              <h3 className="font-semibold text-[#0C433C] text-lg mt-4">Non-Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-1.5 text-[#0C433C]/80">
                <li>Browser type, IP address, operating system, and pages visited on our website.</li>
                <li>Time spent on site, referring links, and device characteristics.</li>
              </ul>
              
              <h3 className="font-semibold text-[#0C433C] text-lg mt-4">Cookies and Tracking Technologies:</h3>
              <p>
                We use cookies to improve your browsing experience, analyze site traffic, and understand user preferences.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec2" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 02"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  How We Use Your Information
                </h2>
              </div>
              <p>
                The information we collect is used for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#0C433C]/80">
                <li>To provide and maintain our services</li>
                <li>To respond to inquiries or customer support requests</li>
                <li>To improve website functionality and user experience</li>
                <li>To send periodic updates, promotional materials, or newsletters (only if you opt-in)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="sec3" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 03"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Sharing of Information
                </h2>
              </div>
              <p>
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#0C433C]/80">
                <li>Trusted service providers who assist in operating our website or delivering services</li>
                <li>Authorities or legal entities if required by law or to protect our rights</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="sec4" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 04"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Data Security
                </h2>
              </div>
              <p>
                We implement robust security measures to protect your information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
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
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec6" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 06"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Your Rights
                </h2>
              </div>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#0C433C]/80">
                <li>Access, update, or delete your personal data</li>
                <li>Withdraw consent for data processing</li>
                <li>Opt-out of receiving marketing communications</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at <a href="mailto:Sales@ppgreencity.com" className="text-[#0C433C] font-semibold underline">Sales@ppgreencity.com</a>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec7" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 07"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Children's Privacy
                </h2>
              </div>
              <p>
                Our website is not intended for individuals under the age of 13, and we do not knowingly collect personal information from children.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec8" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 08"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Communication & DND Disclaimer
                </h2>
              </div>
              <p>
                When you voluntarily send us electronic mail / fill up the form, we will keep a record of this information so that we can respond to you. We only collect information from you when you register on our site or fill out a form. Also, when filling out a form on our site, you may be asked to enter your: name, e-mail address or phone number. You may, however, visit our site anonymously.
              </p>
              <p className="font-semibold text-[#0C433C] bg-[#F2F7F6] p-4 border-l-4 border-[#0C433C]">
                In case you have submitted your personal information and contact details, we reserve the rights to Call, SMS, Email or WhatsApp about our products and offers, even if your number has DND activated on it.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec9" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-bold text-xl sm:text-2xl select-none">{"// 09"}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C433C] tracking-tight">
                  Changes to This Privacy Policy
                </h2>
              </div>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on this page with a revised date.
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
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="bg-[#F2F7F6] p-6 border-l-4 border-[#0C433C] flex flex-col gap-1 text-sm">
                <span className="font-semibold text-[#0C433C]">PP Green City Privacy Officer</span>
                <span className="text-[#0C433C]/80">Email: <a href="mailto:Sales@ppgreencity.com" className="hover:underline text-[#0C433C]">Sales@ppgreencity.com</a></span>
                <span className="text-[#0C433C]/80">Phone: <a href="tel:8222833351" className="hover:underline text-[#0C433C]">8222-8333-51</a></span>
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
