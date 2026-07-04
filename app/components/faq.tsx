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
    question: 'What types of properties do you develop?',
    answer: 'We specialize in premium residential developments (luxury flats, apartments, and exclusive villas) as well as modern commercial properties (strategic retail spaces, office complexes, and corporate hubs) across India.',
  },
  {
    id: 2,
    question: 'How do you ensure construction quality and safety?',
    answer: 'Every project undergoes strict quality controls, built with premium grade-A materials and engineered to meet the highest safety standards. We partner with leading architects, structural engineers, and third-party quality auditors to ensure excellence.',
  },
  {
    id: 3,
    question: 'Do you offer project management services?',
    answer: 'Yes, we manage every phase of development—from architectural planning and securing approvals to construction execution, timelines coordination, and final delivery—ensuring a seamless experience and exceptional value.',
  },
  {
    id: 4,
    question: 'How can I inquire about strategic investments or leasing?',
    answer: 'You can reach out directly to our investment advisory team through the contact channels on our website. We provide detailed market analysis, investment feasibility reports, and comprehensive leasing solutions for corporate clients.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
              <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
                FAQ
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight max-w-md">
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
                    <span className="text-lg sm:text-xl font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors duration-300 pr-8">
                      {item.question}
                    </span>
                    <span className="text-2xl font-light text-zinc-800 flex-shrink-0 w-6 h-6 flex items-center justify-center select-none">
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
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
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
