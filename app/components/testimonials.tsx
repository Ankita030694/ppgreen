'use client';

import { useRef } from 'react';

interface TestimonialItem {
  id: number;
  text: string;
}

const testimonialsList: TestimonialItem[] = [
  {
    id: 1,
    text: 'From Day One, They Understood The Vision We Had — Creating A Space That Felt Modern, Functional, And Timeless. Their Design Approach Reshaped How Our Building Stands In The Community.',
  },
  {
    id: 2,
    text: 'An outstanding development partner. They combined architectural excellence with strict adherence to timelines. The quality of finishes and attention to detail in our new corporate office exceeded all expectations.',
  },
  {
    id: 3,
    text: 'Their customer-first philosophy made the entire buying process smooth and transparent. From strategic advice to project delivery, they are a team you can trust for residential and commercial ventures.',
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header Block: Pill, Main Heading, Subheading */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12 sm:mb-16">
          {/* Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Testimonials
            </span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight text-center">
            What Our Clients Say
          </h2>

          {/* Subheading */}
          <p className="text-[#0C433C]/80 text-sm sm:text-base leading-relaxed max-w-xl text-center">
            Here’s what clients say about our work. True impressions, built from real projects, real partnerships, and results.
          </p>
        </div>

        {/* Testimonials Slider Area */}
        <div className="reveal-on-scroll reveal-delay-150 flex flex-col items-center max-w-4xl mx-auto text-center">
          {/* Slanted Quotes Icon */}
          <div className="text-zinc-300 select-none pointer-events-none mb-6">
            <svg className="w-16 h-12" viewBox="0 0 40 32" fill="currentColor">
              <path d="M12.4 2L8.2 30H0l4.2-28h8.2zm17.6 0L25.8 30H17.6l4.2-28h8.2z" />
            </svg>
          </div>

          {/* Review Cards Slider */}
          <div
            ref={sliderRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide text-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialsList.map((item) => (
              <div
                key={item.id}
                className="w-full flex-shrink-0 snap-start px-4 flex justify-center"
              >
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-[#0C433C] leading-relaxed max-w-3xl text-center">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center w-12 h-12 bg-black hover:bg-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="flex items-center justify-center w-12 h-12 bg-black hover:bg-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
