'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTA from '../components/cta';
import Footer from '../components/footer';

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
}

const projectsList: ProjectItem[] = [
  {
    id: 1,
    title: 'PP City Centre',
    category: 'Commercial',
    location: 'Pitampura, Delhi',
    image: '/PP City Centre/pic-3.webp',
  },
  {
    id: 2,
    title: 'West End Convention Mall',
    category: 'Commercial',
    location: 'Janakpuri, Delhi',
    image: '/West End Convention Mall/west3-1.webp',
  },
  {
    id: 3,
    title: 'PP Trade Centre',
    category: 'Commercial',
    location: 'Netaji Subhash Place',
    image: '/PP Trade Centre/pp_trade_centre.webp',
  },
  {
    id: 4,
    title: 'Mohali Walk',
    category: 'Commercial',
    location: 'Mohali, Punjab',
    image: '/33-scaled.webp',
  },
  {
    id: 5,
    title: 'AP Wonder',
    category: 'Residential',
    location: 'Rithala, Rohini',
    image: '/AP Wonders/Copy of ChatGPT Image Mar 10, 2026 at 01_33_20 AM.webp',
  },
  {
    id: 6,
    title: 'PP Green City',
    category: 'Residential',
    location: 'Sonipat, Haryana',
    image: '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_30_21 AM.webp',
  },
  {
    id: 7,
    title: 'Golf Island',
    category: 'Residential',
    location: 'Sector 19B, Dwarka, Delhi',
    image: '/GolfCity/2.webp',
  },
  {
    id: 8,
    title: 'Vegas Mall',
    category: 'Commercial',
    location: 'Sector 19, Dwarka, Delhi',
    image: '/VegasMall/157656810720191217.webp',
  },
];

export default function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-20">
      {/* 
        Note: Navbar is imported globally inside layout.tsx.
        We keep cta, footer, and image cards as requested.
      */}

      {/* Hero / Header Section */}
      <section className="relative w-full pt-24 sm:pt-28 pb-[50px] bg-white overflow-hidden">
        {/* Faint Architectural Building Sketch Background */}
        <div className="absolute left-0 top-0 bottom-0 w-full sm:w-[50%] lg:w-[40%] opacity-100 select-none pointer-events-none z-0">
          <Image
            src="/back_Sketch.svg"
            alt="Architectural Building Sketch"
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-contain object-left-bottom"
            priority
          />
        </div>

        {/* Header Content */}
        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm">
              {"Featured Projects"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[#0C433C] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight max-w-4xl mb-6">
            Showcasing Spaces That Define the Future
          </h1>

          {/* Subtitle */}
          <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed max-w-2xl">
             Creating thoughtfully designed developments that blend functionality, modern aesthetics, and exceptional craftsmanship.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="relative w-full bg-white pb-[50px]">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
            {projectsList.slice(0, visibleCount).map((project) => (
              <Link key={project.id} href={`/Project_Overview?title=${encodeURIComponent(project.title)}`} className="flex flex-col group cursor-pointer">
                {/* Project Image Container */}
                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-zinc-50 border border-zinc-100 shadow-xs rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_-12px_rgba(12,67,60,0.25)] group-hover:border-[#0C433C]/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                </div>

                {/* Project Details */}
                <h3 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-orange-500/20 text-[#0C433C] px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase select-none transition-colors duration-300 group-hover:border-[#0C433C]/40">
                    {project.category}
                  </span>
                  <span className="border border-orange-500/20 text-[#0C433C] px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase select-none transition-colors duration-300 group-hover:border-[#0C433C]/40">
                    {project.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View More Button */}
          {projectsList.length > visibleCount && (
            <div className="flex justify-center mt-16 sm:mt-20">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-8 py-4 uppercase tracking-wider transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
