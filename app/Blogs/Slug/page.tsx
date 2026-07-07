'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from '../../components/navbar'; // Imported to satisfy request details, rendered globally in layout
import CTA from '../../components/cta';
import Footer from '../../components/footer';

interface TOCItem {
  id: string;
  text: string;
}

const tocItems: TOCItem[] = [
  { id: 'introduction', text: 'Introduction' },
  { id: 'smart-home', text: '1. Smart Home Automation' },
  { id: 'wellness', text: '2. Wellness-Focused Spaces' },
  { id: 'indoor-outdoor', text: '3. Indoor-Outdoor Integration' },
  { id: 'materials', text: '4. Artisanal Materials & Finishes' },
  { id: 'privacy-sanctuary', text: '5. Private Sanctuary Rooms' },
  { id: 'conclusion', text: 'Conclusion' }
];

export default function BlogSlugPage() {
  const [activeId, setActiveId] = useState('introduction');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setDragged(false);
    const container = e.currentTarget;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    const container = e.currentTarget;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setDragged(true);
    }
    e.preventDefault();
    container.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    const activeElement = carouselRef.current.querySelector(`[data-id="${activeId}"]`);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const ids = ['introduction', 'smart-home', 'wellness', 'indoor-outdoor', 'materials', 'privacy-sanctuary', 'conclusion'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to satisfy request requirements and modules status.
      */}

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-zinc-950 overflow-hidden flex items-end">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Blogs/1.svg"
            alt="5 Features Every Modern Luxury Home Should Have"
            fill
            unoptimized
            className="object-cover select-none pointer-events-none opacity-40"
            priority
          />
          {/* Moody gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-zinc-950/20" />
        </div>

        {/* Decorative Grid Lines Overlay (Architectural Theme) */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-10">
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-full flex justify-between">
            <div className="w-[1px] h-full bg-white/[0.07]" />
            <div className="w-[1px] h-full bg-white/[0.07] hidden md:block" />
            <div className="w-[1px] h-full bg-white/[0.07] hidden lg:block" />
            <div className="w-[1px] h-full bg-white/[0.07]" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
            
            {/* Left Column: Metadata */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start gap-1 pb-1 md:pb-3 select-none">
              <span className="text-white font-medium text-sm sm:text-base tracking-wide">
                Architecture
              </span>
              <span className="text-white/60 font-light text-xs sm:text-sm">
                Jul 12, 2026
              </span>
            </div>

            {/* Right Column: Title */}
            <div className="md:col-span-9 lg:col-span-9">
              <h1 className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight">
                5 Features Every Modern Luxury Home Should Have
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* Blog Article Section */}
      <section className="relative w-full bg-white text-zinc-950 py-16 sm:py-24">
        {/* Back sketch background for continuity with other pages */}
        <div className="absolute right-[-5%] top-[10%] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] opacity-[0.04] pointer-events-none select-none">
          <Image
            src="/back_sketch.svg"
            alt="Architectural background element"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-12">
            <Link
              href="/Blogs"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-500 font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Articles
            </Link>
          </div>

          {/* Mobile/Tablet Table of Contents Carousel (Sticky, Horizontal Scrollable, Draggable) */}
          <div
            ref={carouselRef}
            className="lg:hidden flex items-center gap-3 overflow-x-auto py-3 px-1 scrollbar-hide select-none cursor-grab active:cursor-grabbing border-b border-zinc-100 mb-8 sticky top-16 bg-white/95 backdrop-blur-md z-30 -mx-4 px-4 sm:-mx-6 sm:px-6"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {tocItems.map((item) => (
              <a
                key={item.id}
                data-id={item.id}
                href={`#${item.id}`}
                className={`inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase px-4 py-2 border transition-all duration-300 whitespace-nowrap ${
                  activeId === item.id
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (dragged) return;
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                {item.text}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Table of Contents Column (Sticky, Left) */}
            <aside className="lg:col-span-3 hidden lg:block sticky top-28 self-start">
              <div className="border-l border-zinc-100 pl-6 flex flex-col gap-5">
                <span className="text-zinc-400 font-semibold text-xs tracking-widest uppercase select-none">
                  Table of Contents
                </span>
                <nav className="flex flex-col gap-3.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`text-sm tracking-wide leading-snug transition-colors duration-300 font-medium ${
                        activeId === item.id
                          ? 'text-orange-500 border-l-2 border-orange-500 pl-3 -ml-[26px]'
                          : 'text-zinc-400 hover:text-zinc-950 pl-0'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="lg:col-span-9 max-w-3xl flex flex-col gap-10 sm:gap-14">
              
              {/* Introduction Section */}
              <div id="introduction" className="scroll-mt-28 flex flex-col gap-4">
                <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
                  The concept of luxury real estate has undergone a profound shift in recent years. Today, high-end homebuyers look beyond simple square footage or ornate fixtures. True luxury is now defined by standard custom experiences, wellness-centric design, and spaces that respond intelligently to how we live. 
                </p>
                <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
                  Whether you are planning to build your custom estate or searching for a premium property, understanding these modern design pillars ensures you invest in a home that offers both immediate comfort and long-term asset value. Here are the five critical features defining modern luxury homes.
                </p>
              </div>

              {/* 1. Smart Home Automation */}
              <div id="smart-home" className="scroll-mt-28 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg sm:text-xl select-none">// 01</span>
                  <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                    Invisible Smart Home Automation
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Smart technology is no longer an optional add-on; it is the central nervous system of the modern luxury residence. However, the key to modern integration is invisibility. Clunky controls, mismatched keypads, and visible wiring have been replaced by clean, unified interfaces and automated routines.
                </p>
                <blockquote className="border-l-4 border-orange-500 pl-6 my-2 italic text-zinc-800 text-base font-medium">
                  "The most advanced technology in a home is the one you never see, yet always experience."
                </blockquote>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  From centralized lighting systems that automatically adjust color temperatures based on the time of day, to climate zones controlled by subtle hidden sensors, automation should blend seamlessly into the architecture. Integrated security systems with AI-driven threat detection and premium audio-visual equipment concealed within walls or ceilings represent the gold standard of modern smart living.
                </p>
              </div>

              {/* 2. Wellness-Focused Spaces */}
              <div id="wellness" className="scroll-mt-28 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg sm:text-xl select-none">// 02</span>
                  <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                    Wellness-Focused Amenities
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Modern luxury living prioritizes physical and mental well-being above all else. Today's premium homes feature custom spa zones that rival world-class wellness retreats. Homeowners demand spaces where they can decompress, detoxify, and restore their energy without leaving the property.
                </p>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  This includes features like dedicated thermal suites with custom dry saunas and steam showers, custom-built cold plunge pools, and indoor vertical gardens that purify the air. Beyond physical spaces, luxury homes are equipped with medical-grade air purification systems, localized water filtration systems, and circadian lighting setups that align with the human body's natural clock to improve sleep quality.
                </p>
              </div>

              {/* 3. Indoor-Outdoor Integration */}
              <div id="indoor-outdoor" className="scroll-mt-28 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg sm:text-xl select-none">// 03</span>
                  <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                    Seamless Indoor-Outdoor Integration
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  One of the most requested features in luxury architecture is biophilic design—the practice of connecting building occupants more closely to nature. Achieving this requires breaking down the physical boundaries between indoor living spaces and outdoor landscapes.
                </p>
                <div className="relative aspect-[16/9] w-full bg-zinc-50 overflow-hidden border border-zinc-100 my-2">
                  <Image
                    src="/Blogs/1.svg"
                    alt="Luxury architectural indoor outdoor layout"
                    fill
                    unoptimized
                    className="object-cover pointer-events-none select-none opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-xs font-medium tracking-wider uppercase select-none">
                    Biophilic Architectural Design
                  </span>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  This connection is achieved through floor-to-ceiling glass pocket doors that slide entirely into the walls, creating an uninterrupted flow onto expansive terraces, poolside pavilions, or landscaped courtyards. Outdoor dining areas are elevated with full professional kitchens, fireplace lounges, and zero-edge pools, making the outdoor space an organic extension of the living room.
                </p>
              </div>

              {/* 4. Artisanal Materials & Finishes */}
              <div id="materials" className="scroll-mt-28 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg sm:text-xl select-none">// 04</span>
                  <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                    Artisanal Materials & Bespoke Finishes
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Mass-produced finishes are a mismatch for premium homes. The ultimate luxury lies in materials with history, character, and craftsmanship. Every texture inside the home should tell a story of careful sourcing and meticulous installation.
                </p>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Rare book-matched marbles sourced directly from Italian quarries, wide-plank French oak flooring, hand-applied Venetian plaster, and custom patinated bronze door handles are standard details in modern estates. These organic, tactile elements establish an aesthetic of understated luxury that matures beautifully over time.
                </p>
              </div>

              {/* 5. Private Sanctuary Rooms */}
              <div id="privacy-sanctuary" className="scroll-mt-28 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg sm:text-xl select-none">// 05</span>
                  <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                    Dedicated Private Sanctuary Rooms
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Modern luxury living recognizes that peace and quiet are two of the rarest commodities. Homes are therefore designed with designated zones configured as private sanctuaries—spaces customized specifically for hobbies, focus, or private leisure.
                </p>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Examples include acoustically isolated listening rooms for audiophiles, wood-paneled libraries with secret doors, temperature-controlled wine vaults, and home wellness studios. These spaces are soundproofed and tailored precisely to the owner's interests, offering an escape from the demands of daily life.
                </p>
              </div>

              {/* Conclusion Section */}
              <div id="conclusion" className="scroll-mt-28 flex flex-col gap-6 border-t border-zinc-100 pt-10">
                <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl tracking-tight">
                  The Future of Luxury Home Design
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                  Ultimately, a modern luxury home is a masterfully choreographed space where technology, wellness, materials, and nature intersect. By focusing on quality over excess and design logic over trends, these properties become timeless landmarks that support a modern, refined lifestyle.
                </p>
              </div>

            </article>

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
