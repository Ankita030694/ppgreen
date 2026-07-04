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
    <section id="testimonials" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading, Subheading & Controls */}
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 h-full justify-between">
            <div className="flex flex-col gap-4">
              {/* Tagline */}
              <div className="flex items-center gap-2.5">
                <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
                <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
                  Testimonials
                </span>
              </div>
              
              {/* Description */}
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-sm">
                Here’s what clients say about our work. True impressions, built from real projects, real partnerships, and results.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 mt-4 md:mt-12">
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

          {/* Right Column: Quotes Icon & Review Slider */}
          <div className="md:col-span-8 flex flex-col pt-4 md:pt-8 w-full overflow-hidden">
            {/* Slanted Quotes Icon */}
            <div className="text-zinc-400 select-none pointer-events-none mb-6">
              <svg className="w-16 h-12" viewBox="0 0 40 32" fill="currentColor">
                <path d="M12.4 2L8.2 30H0l4.2-28h8.2zm17.6 0L25.8 30H17.6l4.2-28h8.2z" />
              </svg>
            </div>

            {/* Review Cards Slider */}
            <div
              ref={sliderRef}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonialsList.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 snap-start pr-4"
                >
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium text-zinc-950 leading-relaxed max-w-4xl">
                    {item.text}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
