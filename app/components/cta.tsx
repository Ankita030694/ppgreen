'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CTA() {

  return (
    <section id="cta" className="relative w-full bg-white text-black pt-2 sm:pt-2 pb-12 md:pb-0 overflow-hidden">
      
      {/* Header Block inside Container */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Tagline */}
          <div className="flex items-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm">
              Reach out
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight">
            Ready to build? <br />
            Contact us today
          </h2>
        </div>
      </div>

      {/* Content Wrapper (Edge to Edge) */}
      <div className="relative w-full mt-12 md:mt-24">
        
        {/* Image Container (Full screen width) */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[300px] md:min-h-[450px] overflow-hidden">
          <Image
            src="/CTA.svg"
            alt="Ready to build?"
            fill
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority={false}
          />
        </div>

        {/* Overlay Contact Card (Desktop - absolute overlays) */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-full flex justify-end relative">
            <div className="pointer-events-auto absolute -top-24 right-4 sm:right-6 lg:right-8 w-[380px] bg-white z-10 flex flex-col border border-zinc-100 shadow-2xl">
              {/* Orange Link Header */}
              <Link
                href="/ContactUs"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base sm:text-lg px-8 py-5 flex items-center justify-between transition-colors duration-300 active:scale-[0.99] cursor-pointer border-none focus:outline-none"
              >
                <span>Get in Touch</span>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Contact details */}
              <div className="p-8 flex flex-col gap-6 bg-white">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Email</span>
                    <a href="mailto:info@yourrealestate.com" className="text-sm sm:text-base font-medium text-zinc-900 hover:text-orange-500 transition-colors duration-300">
                      info@yourrealestate.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Phone</span>
                    <a href="tel:+919876543210" className="text-sm sm:text-base font-medium text-zinc-900 hover:text-orange-500 transition-colors duration-300">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75L15 3v14.25L9 21V6.75zm0 0L3 3v14.25l6 3.75zm6-3.75l6 3.75V21l-6-3.75V3z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Office</span>
                    <p className="text-sm sm:text-base font-medium text-zinc-900 leading-relaxed">
                      Corporate Office, MG Road, <br />
                      Gurugram, Haryana, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contact Card (Overlaying the image absolutely) */}
        <div className="absolute top-[-30px] right-4 w-[58%] min-w-[200px] max-w-[270px] bg-white z-10 flex flex-col border border-zinc-100 shadow-xl md:hidden">
          {/* Orange Link Header */}
          <Link
            href="/ContactUs"
            className="w-full bg-[#FF6A00] hover:bg-[#E05B00] text-white font-semibold text-sm px-4 py-4 flex items-center justify-between transition-colors duration-300 active:scale-[0.99] cursor-pointer border-none focus:outline-none"
          >
            <span>{"Get in Touch"}</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Contact details */}
          <div className="p-4 flex flex-col gap-4 bg-white text-zinc-900">
            {/* Email */}
            <div className="flex flex-col items-start gap-1">
              <svg className="w-4 h-4 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:info@yourrealestate.com" className="text-xs font-normal hover:text-orange-500 transition-colors duration-300 break-all leading-normal">
                {"info@yourrealestate.com"}
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-start gap-1">
              <svg className="w-4 h-4 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <a href="tel:+919876543210" className="text-xs font-normal hover:text-orange-500 transition-colors duration-300 leading-normal">
                {"+91 98765 43210"}
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-start gap-1">
              <svg className="w-4 h-4 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75L15 3v14.25L9 21V6.75zm0 0L3 3v14.25l6 3.75zm6-3.75l6 3.75V21l-6-3.75V3z" />
              </svg>
              <p className="text-xs font-normal leading-normal">
                {"Corporate Office, MG Road, Gurugram, Haryana, India"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
