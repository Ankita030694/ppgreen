'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: 1,
    question: 'What type of properties do you offer?',
    answer: 'We offer a diverse range of premium real estate opportunities, including residential and commercial plots. Our projects are thoughtfully planned to cater to end-users, investors and those seeking long-term value appreciation.',
  },
  {
    id: 2,
    question: 'Are your projects RERA registered?',
    answer: 'All applicable projects are developed in accordance with the prevailing RERA guidelines and regulatory requirements. Project-specific registration details are available on the respective project pages or can be shared by our team.'  },
  {
    id: 3,
    question: 'How can I schedule a site visit?',
    answer: 'You can schedule a site visit by submitting an enquiry through our website or contacting our sales team directly. Our team will coordinate a convenient time and assist you throughout the visit.',
  },
  {
    id: 4,
    question: 'Do you provide financing assistance?',
    answer: 'Yes. We can assist prospective buyers in exploring financing options through our banking and financial institution partners, subject to the applicable eligibility criteria and approval terms.',
  },
  {
    id: 5,
    question: 'Can I visit the project before making a purchase?',
    answer: 'Absolutely. We encourage prospective buyers to visit the project site and experience the development firsthand before making an informed investment decision.',
  },
  {
    id: 6,
    question: 'What payment plans are available?',
    answer: 'Payment plans vary depending on the specific project and applicable terms. Our sales team will provide complete details and guide you through the available options.',
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-white text-[#0C433C] pt-[88px] pb-4 sm:pb-6 overflow-hidden ">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
                FAQ
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight max-w-md">
              Frequently asked questions
            </h2>
          </div>

          {/* Right Column: Accordion list */}
          <div className="md:col-span-7 flex flex-col w-full">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className="border-b border-orange-500/60 last:border-b-0 py-6 first:pt-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl font-semibold text-[#0C433C]  transition-colors duration-300 pr-8">
                      {item.question}
                    </span>
                    <span className="text-4xl font-light text-[#0C433C] flex-shrink-0 w-6 h-6 flex items-center justify-center select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '200px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? '16px' : '0px',
                    }}
                  >
                    <p className="text-[#0C433C]/80 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
