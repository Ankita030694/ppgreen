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
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/About_Us/1.svg"
            className="w-full h-full object-cover select-none pointer-events-none opacity-45"
          >
            <source src="/Copy of PP Green Drone Reel (1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
                <span className="w-3 h-3 rounded-full bg-[#FFFFFF] shrink-0" />
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

          {/* Bottom Block: Mission/Vision in Single Row (No Image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Mission Column */}
            <div className="flex flex-col items-start">
              <h3 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-4">
                Our Mission
              </h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light mb-8">
                 To build upon our legacy of trust and excellence by consistently delivering superior quality, creating enduring value and setting new benchmarks in customer experience.
              </p>
              
              {/* Get in Touch Button below Mission */}
              <Link
                href="/ContactUs"
                className="inline-flex items-center justify-center bg-[#0C433C] hover:bg-[#09332d] text-white font-medium text-xs sm:text-sm tracking-wider uppercase px-8 py-4 transition-all duration-300 w-fit active:scale-[0.98]"
              >
                Get in Touch
              </Link>
            </div>

            {/* Vision Column */}
            <div className="flex flex-col items-start">
              <h3 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-4">
                Our Vision
              </h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                 To emerge as a leading force in the real estate industry, recognised for our commitment to excellence, innovation, integrity and customer satisfaction.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy Section */}
      <section className="w-full bg-white text-zinc-950 py-20 sm:py-28 border-t border-b border-zinc-100 -mt-15">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Tagline / Subtitle */}
          <div className="mb-12 sm:mb-16">
            <p className="text-[#0C433C] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              Continuous Improvement &bull; Uncompromising Quality &bull; Enduring Relationships
            </p>
            <h2 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight max-w-4xl">
              Creating Value. Building Trust. Shaping the Future.
            </h2>
          </div>

          {/* Three-Column Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-16">
            {/* Value 1: Commitment to Excellence */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 01</span>
              <h3 className="text-zinc-950 font-semibold text-xl mb-4">Commitment to Excellence</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                We are driven by a commitment to excellence, continuous improvement and the creation of enduring value. With a strong focus on quality, innovation and customer-centricity, we develop projects that are thoughtfully planned, meticulously executed and designed to stand the test of time.
              </p>
            </div>

            {/* Value 2: Evolving Needs & Diverse Portfolio */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 02</span>
              <h3 className="text-zinc-950 font-semibold text-xl mb-4">Diverse Portfolio</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                Our diverse portfolio spans residential developments, premium villas, retail, commercial and office spaces, reflecting our ability to understand evolving needs and deliver future-ready solutions. Every project combines strategic vision, operational excellence, superior infrastructure, contemporary design and modern amenities.
              </p>
            </div>

            {/* Value 3: Personalised Guidance & Seamless Experience */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 03</span>
              <h3 className="text-zinc-950 font-semibold text-xl mb-4">Customer Experience</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                We believe that a seamless customer experience is built on transparency, clear communication and personalised guidance. Our dedicated relationship management team remains committed to supporting clients throughout the project lifecycle.
              </p>
            </div>
          </div>

          {/* Core Belief Callout / Quote Box */}
          <div className="bg-[#0C433C] text-white p-8 sm:p-12 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
            {/* Background pattern for subtle texture */}
            <div className="absolute right-[-10%] bottom-[-20%] w-[300px] h-[300px] opacity-[0.04] pointer-events-none select-none">
              <svg fill="currentColor" viewBox="0 0 100 100" className="w-full h-full text-white">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            
            <div className="max-w-3xl z-10">
              <p className="text-zinc-300 font-sans tracking-widest text-xs sm:text-sm uppercase mb-3">// Our Core Belief</p>
              <h3 className="text-white font-medium text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                &ldquo;At the core of our organisation is a simple belief: true success lies in creating value that endures.&rdquo;
              </h3>
            </div>
            <div className="shrink-0 z-10">
              <Link
                href="/Portfolio"
                className="inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-[#0C433C] font-medium text-xs sm:text-sm tracking-wider uppercase px-8 py-4 transition-all duration-300 w-fit active:scale-[0.98]"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="w-full bg-white text-zinc-950 py-10 sm:py-24 md:py-28">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left side Founder Portrait Photo */}
            <div className="lg:col-span-4 w-full max-w-[320px] mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xs border border-zinc-100">
                <Image
                  src="/founder.jpg"
                  alt="Avinash Puri - Founder, Puri Group"
                  fill
                  unoptimized
                  className="object-cover select-none"
                />
              </div>
            </div>

            {/* Right side Founder's Note Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Heading */}
              <div className="flex items-center gap-2.5">
                <span className="text-[#0C433C] font-sans font-bold text-xl sm:text-2xl select-none">//</span>
                <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  Founder’s Note
                </h2>
              </div>

              {/* Body Text */}
              <div className="space-y-5 text-zinc-700 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                <p>
                  At Puri Group, we believe every great community begins with a vision—one that puts people, trust, and lasting value at its heart.
                </p>
                <p>
                  With PP Green City, our aspiration is to create more than just plotted developments. We aim to build a place where families can grow, dreams can take shape, and future generations can thrive.
                </p>
                <p>
                  Thank you for placing your trust in us. We look forward to being a part of your journey.
                </p>
              </div>

              {/* Sign-off */}
              <div className="mt-2 pt-2">
                <p className="text-zinc-950 font-semibold text-base sm:text-lg">
                  – Avinash Puri
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm tracking-wide">
                  Founder, Puri Group
                </p>
              </div>
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
          <div className="absolute inset-0" />
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
