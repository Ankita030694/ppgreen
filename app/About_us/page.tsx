'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from '../components/navbar'; // Imported to satisfy request details, rendered globally in layout
import CTA from '../components/cta';
import Footer from '../components/footer';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({
  value,
  duration = 1500,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            
            setCount(Math.floor(easeProgress * value));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutUsPage() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to satisfy request requirements and modules status.
      */}

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-screen bg-zinc-950 overflow-hidden flex items-end">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/About_Us/1.svg"
            alt="About PP Green background"
            fill
            unoptimized
            className="object-cover select-none pointer-events-none opacity-45"
            priority
          />
          {/* Gradients and solid colors for high contrast and moody aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
          <div className="absolute inset-0 " />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-36 pb-12 sm:pb-16 lg:pb-20">
          {/* Top spacing to account for header */}
          <div />

          {/* Grid Layout for Hero Text Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            {/* Left Column: Big Title */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h1 className="text-white font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[8.5rem] leading-[0.9] tracking-tight">
                About PP Green
              </h1>
            </div>

            {/* Right Column: Mini-description Block */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start max-w-md lg:ml-auto lg:pb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#0C433C] shrink-0" />
                <h2 className="text-white font-semibold text-base sm:text-lg tracking-wide">
                  Trusted Real Estate Partner
                </h2>
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                Creating sustainable spaces with innovation, quality, and lasting value across residential, commercial, and investment properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Mission/Vision Section */}
      <section className="relative w-full bg-white text-zinc-950 py-20 sm:py-28 md:py-32 overflow-hidden">
        {/* Background Sketch Image */}
        <div className="absolute left-[-5%] top-[5%] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] opacity-[0.06] pointer-events-none select-none">
          <Image
            src="/back_sketch.svg"
            alt="Architectural building sketch background"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Top Block: Title and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-44 mb-16 sm:mb-20 md:mb-24">
            {/* Tagline */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <span className="text-[#0C433C] font-sans font-bold text-xl sm:text-2xl select-none">//</span>
                <span className="text-zinc-500 font-sans font-regular tracking-widest text-xs sm:text-sm ">
                  About Us
                </span>
              </div>
            </div>

            {/* Main Statement */}
            <div className="lg:col-span-9 max-w-2xl">
              <h2 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight mb-6">
                Building India’s Future Through Thoughtful Real Estate Development
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                A trusted real estate company creating premium residential and commercial spaces across India. We combine quality construction, prime locations, and modern design to deliver lasting value and exceptional living experiences.
              </p>
            </div>
          </div>

          {/* Bottom Block: Image on Left, Mission/Vision on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
            {/* Left side Image */}
            <div className="lg:col-span-5 aspect-[4/3] sm:aspect-square lg:aspect-[9/10] relative w-full overflow-hidden bg-zinc-50 ">
              <Image
                src="/Blogs/1.svg"
                alt="Blueprint drawing plans and hands sketching"
                fill
                unoptimized
                className="object-cover select-none pointer-events-none"
              />
            </div>

            {/* Right side Mission & Vision content */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl lg:pl-4">
              {/* Mission */}
              <div className="mb-10 sm:mb-12">
                <h3 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-4">
                  Our Mission
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  To provide trusted real estate solutions with transparency, quality, and expert guidance, helping every client find the right property and make confident investment decisions.
                </p>
              </div>

              {/* Vision */}
              <div className="mb-10 sm:mb-12">
                <h3 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-4">
                  Our Vision
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  To redefine modern real estate by creating sustainable communities, delivering exceptional value, and building lasting relationships through innovation and integrity.
                </p>
              </div>

              {/* Get in Touch Button */}
              <Link
                href="/ContactUs"
                className="inline-flex items-center justify-center bg-[#0C433C] hover:bg-[#09332d] text-white font-medium text-xs sm:text-sm tracking-wider uppercase px-8 py-4 transition-all duration-300 w-fit active:scale-[0.98]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Counter Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-28 lg:py-12  overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/About_Us/2.svg"
            alt="City buildings and skyscrapers background"
            fill
            unoptimized
            className="object-cover select-none pointer-events-none opacity-40"
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/1    0 via-black/10 to-black/10" />
        </div>

        {/* Counter Content Container */}
        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 items-end justify-items-center md:justify-items-stretch">
            {/* Stat 1: 15 million sq. ft. of spaces */}
            <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-start">
              <span className="text-[#0C433C] font-sans font-semibold text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight">
                <AnimatedCounter value={15} suffix="M+" />
              </span>
              <div className="flex flex-col text-left text-white leading-tight">
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Sq. Ft.</span>
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Of Spaces</span>
              </div>
            </div>

            {/* Stat 2: 200+ Projects Delivered */}
            <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-center">
              <span className="text-[#0C433C] font-sans font-semibold text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight">
                <AnimatedCounter value={200} suffix="+" />
              </span>
              <div className="flex flex-col text-left text-white leading-tight">
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Projects</span>
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Delivered</span>
              </div>
            </div>

            {/* Stat 3: 15,000+ Happy Customers */}
            <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-end">
              <span className="text-[#0C433C] font-sans font-semibold text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight">
                <AnimatedCounter value={15000} suffix="+" />
              </span>
              <div className="flex flex-col text-left text-white leading-tight">
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Happy</span>
                <span className="text-sm sm:text-base lg:text-lg font-light tracking-wider uppercase">Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="w-full bg-white text-zinc-950 py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 sm:mb-20">
            {/* Tagline */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="text-[#0C433C] font-sans font-bold text-xl sm:text-2xl select-none">//</span>
                <span className="text-zinc-500 font-sans font-regular tracking-widest text-xs sm:text-sm ">
                  Our Process
                </span>
              </div>
            </div>

            {/* Main Title */}
            <div className="lg:col-span-8 max-w-2xl">
              <h2 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight">
                A seamless approach to exceptional real estate solutions.
              </h2>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1: Discovery */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col   transition-all duration-300">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl mb-3">
                Discovery & Consultation
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                We begin by understanding your goals, site conditions, and vision. This sets a clear foundation and direction for the entire project.
              </p>
            </div>

            {/* Card 2: Concept Development */}  
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col   transition-all duration-300">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v13a2 2 0 002 2h11M16 21V8a2 2 0 00-2-2H3" />
                </svg>
              </div>
              <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl mb-3">
                Concept Development
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                We explore design ideas, refine concepts, and create early layouts. Each direction is shaped with clarity, intention, and precision.
              </p>
            </div>

            {/* Card 3: Detailed Technical Design */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10L12 4l9 6M6 10v9M10 10v9M14 10v9M18 10v9M4 19h16M3 21h18" />
                </svg>
              </div>
              <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl mb-3">
                Detailed Technical Design
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                We transform concepts into detailed architectural plans, ensuring accuracy across structure, materials, and coordination.
              </p>
            </div>

            {/* Card 4: Project Delivery */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m12-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3" />
                </svg>
              </div>
              <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl mb-3">
                Project Delivery & Support
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                We support contractors and oversee project progress, helping ensure a smooth build and faithful design execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
