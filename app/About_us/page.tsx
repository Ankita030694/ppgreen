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
          <Image
            src="/15M_plus.png"
            alt="About us background"
            fill
            priority
            className="object-cover object-top opacity-45 select-none pointer-events-none"
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
            <div className="lg:col-span-8 order-2 lg:order-1">
              <h1 className="text-[#F9CC94] font-semibold text-[43px] sm:text-[65px] md:text-[86px] lg:text-[6.8rem] xl:text-[7.65rem] leading-[0.9] tracking-tight whitespace-nowrap">
                About PP Green
              </h1>
            </div>

            {/* Right Column: Mini-description Block */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-start max-w-md lg:ml-auto lg:pb-8">
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
      <section className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden">
        {/* Background Sketch Image */}
        <div className="absolute left-[-5%] top-[5%] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] opacity-[0.06] pointer-events-none select-none">
          <Image
            src="/back_Sketch.svg"
            alt="Architectural building sketch background"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Top Block: Title and Description */}
          <div className="reveal-on-scroll flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
            {/* Tagline / Pill */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#0C433C] font-sans font-bold text-xl sm:text-2xl select-none">//</span>
              <span className="text-[#0C433C]/60 font-sans font-regular tracking-widest text-xs sm:text-sm uppercase">
                About Us
              </span>
            </div>

            {/* Main Statement */}
            <h2 className="text-[#0C433C] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight mb-6 text-center">
              Creating Value. Building Trust. Shaping the Future.
            </h2>
            <p className="text-[#000000]/60 text-sm sm:text-base md:text-lg leading-relaxed font-light text-center max-w-3xl">
              Driven by a commitment to excellence, continuous improvement and the creation of enduring value. With a strong focus on quality, innovation and customer-centricity, projects are thoughtfully planned, meticulously executed and designed to stand the test of time.
            </p>
          </div>

          {/* Bottom Block: Mission/Vision in Single Row (No Image) */}
          <div className="reveal-on-scroll reveal-delay-150 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Mission Column */}
            <div className="flex flex-col items-start">
              <h3 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-4">
                Our Mission
              </h3>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed font-light mb-8">
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
              <h3 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-4">
                Our Vision
              </h3>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed font-light">
                 To emerge as a leading force in the real estate industry, recognised for our commitment to excellence, innovation, integrity and customer satisfaction.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy Section */}
      <section className="w-full bg-white text-[#0C433C] py-[50px] border-t border-b border-zinc-100">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Tagline / Subtitle */}
          <div className="reveal-on-scroll flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <p className="text-[#000000] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 text-center">
              Continuous Improvement &bull; Uncompromising Quality &bull; Enduring Relationships
            </p>
            <h2 className="text-[#0C433C] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight text-center">
              Creating Value. Building Trust. Shaping the Future.
            </h2>
          </div>

          {/* Three-Column Values Grid */}
          <div className="reveal-on-scroll reveal-delay-150 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-16">
            {/* Value 1: Commitment to Excellence */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-[0_16px_36px_-8px_rgba(12,67,60,0.18)] hover:border-l-4 hover:border-l-[#0C433C] hover:border-zinc-200/80 hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 01</span>
              <h3 className="text-[#0C433C] font-semibold text-xl mb-4 group-hover:text-[#0C433C] transition-colors">Commitment to Excellence</h3>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed font-light">
                We are driven by a commitment to excellence, continuous improvement and the creation of enduring value. With a strong focus on quality, innovation and customer-centricity, we develop projects that are thoughtfully planned, meticulously executed and designed to stand the test of time.
              </p>
            </div>

            {/* Value 2: Evolving Needs & Diverse Portfolio */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-[0_16px_36px_-8px_rgba(12,67,60,0.18)] hover:border-l-4 hover:border-l-[#0C433C] hover:border-zinc-200/80 hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 02</span>
              <h3 className="text-[#0C433C] font-semibold text-xl mb-4 group-hover:text-[#0C433C] transition-colors">Diverse Portfolio</h3>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed font-light">
                Our diverse portfolio spans residential developments, premium villas, retail, commercial and office spaces, reflecting our ability to understand evolving needs and deliver future-ready solutions. Every project combines strategic vision, operational excellence, superior infrastructure, contemporary design and modern amenities.
              </p>
            </div>

            {/* Value 3: Personalised Guidance & Seamless Experience */}
            <div className="flex flex-col bg-white border border-zinc-100 p-8 sm:p-10 shadow-xs hover:shadow-[0_16px_36px_-8px_rgba(12,67,60,0.18)] hover:border-l-4 hover:border-l-[#0C433C] hover:border-zinc-200/80 hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
              <span className="text-[#0C433C] font-sans font-bold text-2xl mb-6 select-none group-hover:translate-x-1 transition-transform duration-300 block">// 03</span>
              <h3 className="text-[#0C433C] font-semibold text-xl mb-4 group-hover:text-[#0C433C] transition-colors">Customer Experience</h3>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed font-light">
                We believe that a seamless customer experience is built on transparency, clear communication and personalised guidance. Our dedicated relationship management team remains committed to supporting clients throughout the project lifecycle.
              </p>
            </div>
          </div>

          {/* Core Belief Callout / Quote Box */}
          <div className="reveal-on-scroll reveal-delay-200 bg-[#0C433C] text-white p-8 sm:p-12 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
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

      {/* Two Generations. One Vision Section */}
      <section className="w-full bg-[#F2F7F6]/40 py-[50px] border-t border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Section Header */}
          <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Tagline / Pill */}
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
                Leadership
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0C433C]">
              Two Generations. <span className="text-[#0C433C]/75 font-normal">One Vision.</span>
            </h2>
          </div>

          {/* Cards Stack */}
          <div className="flex flex-col gap-10 sm:gap-12 max-w-6xl mx-auto">
            {/* Card 1: Founder's Note */}
            <div className="reveal-on-scroll reveal-delay-100 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/80 shadow-xs p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-12px_rgba(12,67,60,0.22)] hover:border-[#0C433C]/40 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left side: Photo */}
                <div className="lg:col-span-5 w-full">
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 shadow-xs border border-zinc-100">
                    <Image
                      src="/founder.jpg"
                      alt="Avinash Puri - Founder, Puri Group"
                      fill
                      unoptimized
                      className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-semibold text-2xl sm:text-3xl text-[#0C433C]">
                      Founders Note
                    </h3>
                    <span className="h-[2px] w-12 sm:w-16 bg-[#0C433C]/30" />
                  </div>

                  <p className="text-[#000000]/65 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-4 font-light">
                    At Puri Group, we believe every great community begins with a vision—one that puts people, trust, and lasting value at its heart. Seeing our projects stand the test of time and provide homes to thousands of happy families across the country is a reflection of the confidence our customers place in us every day.
                  </p>

                  <div className="border-l-2 border-[#0C433C] pl-4 sm:pl-5 py-1.5 my-3 sm:my-4 bg-[#F2F7F6]/60 rounded-r-lg">
                    <p className="text-[#0C433C]/90 text-xs sm:text-sm md:text-[14px] leading-relaxed">
                      As the real estate landscape evolves, we remain committed to innovation, quality and long-term value. Our focus continues to be on delivering durable, efficient and dependable solutions that help our customers invest with confidence and grow sustainably.
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-zinc-100 my-4" />

                  <div>
                    <h4 className="font-semibold text-xl sm:text-2xl text-[#0C433C] tracking-tight">
                      Avinash Puri
                    </h4>
                    <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mt-1 block">
                      FOUNDER, PURI GROUP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Rooted in Legacy */}
            <div className="reveal-on-scroll reveal-delay-200 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/80 shadow-xs p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-12px_rgba(12,67,60,0.22)] hover:border-[#0C433C]/40 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left side: Photo */}
                <div className="lg:col-span-5 w-full">
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 shadow-xs border border-zinc-100">
                    <Image
                      src="/director.jpg"
                      alt="Mehul Chawla - Executive Director"
                      fill
                      unoptimized
                      className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-semibold text-2xl sm:text-3xl text-[#0C433C]">
                      Rooted in Legacy
                    </h3>
                    <span className="h-[2px] w-12 sm:w-16 bg-[#0C433C]/30" />
                  </div>

                  <p className="text-[#000000]/65 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-4 font-light">
                    My father built this company with a simple belief that success comes from earning trust, not just selling properties. Growing up, I watched him build lasting relationships with customers and learned that our real product has always been reliability, service, and commitment.
                  </p>

                  <div className="border-l-2 border-[#0C433C] pl-4 sm:pl-5 py-1.5 my-3 sm:my-4 bg-[#F2F7F6]/60 rounded-r-lg">
                    <p className="text-[#0C433C]/90 text-xs sm:text-sm md:text-[14px] leading-relaxed">
                      As the second generation leading this journey forward, my focus is on preserving those values while embracing the future. With advancements in modern urban planning, smart infrastructure, and green spaces, we continue to innovate so our clients can invest with confidence. This company was built on trust and my commitment is to keep strengthening that trust for generations to come.
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-zinc-100 my-4" />

                  <div>
                    <h4 className="font-semibold text-xl sm:text-2xl text-[#0C433C] tracking-tight">
                      Mehul Chawla
                    </h4>
                    <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mt-1 block">
                      EXECUTIVE DIRECTOR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Counter Section */}
      <section className="relative w-full py-[50px] overflow-hidden">
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
        <div className="reveal-on-scroll relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
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
      <section className="w-full bg-white text-[#0C433C] py-[50px]">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="reveal-on-scroll flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
            {/* Tagline / Pill */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#0C433C] font-sans font-bold text-xl sm:text-2xl select-none">//</span>
              <span className="text-[#0C433C]/60 font-sans font-regular tracking-widest text-xs sm:text-sm uppercase">
                Our Expertise
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-[#0C433C] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight text-center">
              A diverse portfolio creating spaces for living, business and investment.
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="reveal-on-scroll reveal-delay-150 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1: Residential */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300 hover:bg-[#F2F7F6]/60 hover:border-[#0C433C]/30 hover:shadow-[0_14px_30px_-6px_rgba(12,67,60,0.16)] hover:-translate-y-1 group cursor-default">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400 group-hover:text-[#0C433C] group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-[#0C433C] font-semibold text-lg sm:text-xl mb-3">
                Residential
              </h3>
              <p className="text-[#000000]/60 text-sm leading-relaxed font-light">
                Thoughtfully planned homes designed for contemporary living, comfort and lasting value.
              </p>
            </div>

            {/* Card 2: Retail */}  
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300 hover:bg-[#F2F7F6]/60 hover:border-[#0C433C]/30 hover:shadow-[0_14px_30px_-6px_rgba(12,67,60,0.16)] hover:-translate-y-1 group cursor-default">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400 group-hover:text-[#0C433C] group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.651V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009 9.35c.697 0 1.353-.238 1.875-.638A2.993 2.993 0 0012 9.35c.697 0 1.353-.238 1.875-.638A2.993 2.993 0 0015 9.35c.697 0 1.353-.238 1.875-.638A2.993 2.993 0 0018 9.35a3.001 3.001 0 003.75.614M3.75 9.349L5.25 3h13.5l1.5 6.349" />
                </svg>
              </div>
              <h3 className="text-[#0C433C] font-semibold text-lg sm:text-xl mb-3">
                Retail
              </h3>
              <p className="text-[#000000]/60 text-sm leading-relaxed font-light">
                 Strategically positioned retail spaces designed to connect businesses with high-potential markets.
              </p>
            </div>

            {/* Card 3: Office */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300 hover:bg-[#F2F7F6]/60 hover:border-[#0C433C]/30 hover:shadow-[0_14px_30px_-6px_rgba(12,67,60,0.16)] hover:-translate-y-1 group cursor-default">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400 group-hover:text-[#0C433C] group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h3 className="text-[#0C433C] font-semibold text-lg sm:text-xl mb-3">
                Office
              </h3>
              <p className="text-[#000000]/60 text-sm leading-relaxed font-light">
                 Contemporary workspaces created for businesses seeking connectivity, functionality and growth.
              </p>
            </div>

            {/* Card 4: Plots */}
            <div className="bg-white border border-zinc-100 p-8 sm:p-10 flex flex-col transition-all duration-300 hover:bg-[#F2F7F6]/60 hover:border-[#0C433C]/30 hover:shadow-[0_14px_30px_-6px_rgba(12,67,60,0.16)] hover:-translate-y-1 group cursor-default">
              <div className="mb-8">
                <svg className="w-8 h-8 text-zinc-400 group-hover:text-[#0C433C] group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-[#0C433C] font-semibold text-lg sm:text-xl mb-3">
                Plots
              </h3>
              <p className="text-[#000000]/60 text-sm leading-relaxed font-light">
                Well-located plotted developments offering flexibility to build, invest and create spaces your way.
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
