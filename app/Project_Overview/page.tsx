'use client';

import { useRef } from 'react';
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

const moreProjectsList: ProjectItem[] = [
  {
    id: 1,
    title: 'Skyline Business Park',
    category: 'Commercial',
    location: 'Gurugram, Haryana',
    image: '/Portfolio/1.svg',
  },
  {
    id: 2,
    title: 'Skyline Business Park',
    category: 'Commercial',
    location: 'Gurugram, Haryana',
    image: '/Portfolio/1.svg',
  },
  {
    id: 3,
    title: 'Skyline Business Park',
    category: 'Commercial',
    location: 'Gurugram, Haryana',
    image: '/Portfolio/1.svg',
  },
  {
    id: 4,
    title: 'Skyline Business Park',
    category: 'Commercial',
    location: 'Gurugram, Haryana',
    image: '/Portfolio/1.svg',
  },
];

export default function ProjectOverview() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = sliderRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = sliderRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = sliderRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = sliderRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-1">
      {/* 
        Note: Navbar is imported globally inside layout.tsx.
      */}

      {/* Hero Section */}
      <section className="relative w-full h-[65vh] sm:h-[80vh] md:h-[85vh] bg-[#f7f7f7] overflow-hidden flex items-end">
        {/* Background Project Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Portfolio/1.svg"
            alt="Skyline Business Park"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-10 flex flex-col items-start">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="border border-[#0C433C] text-zinc-900 bg-white/40 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
              Commercial
            </span>
            <span className="border border-[#0C433C] text-zinc-900 bg-white/40 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
              Gurugram, Haryana
            </span>
          </div>

          {/* Title */}
          <h1 className="text-zinc-950 font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
            Skyline Business Park
          </h1>
        </div>
      </section>

      {/* Project Details & Overview Content Section */}
      <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-8">
          
          {/* Details Block */}
          <div className="flex flex-col">
            <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-6">
              {"Details"}
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              {/* Client */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-28 sm:w-36 shrink-0">{"Client:"}</span>
                <span className="text-zinc-800 font-normal">{"Skyline Developers Pvt. Ltd."}</span>
              </div>
              {/* Completed */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-28 sm:w-36 shrink-0">{"Completed:"}</span>
                <span className="text-zinc-800 font-normal">{"March 2026"}</span>
              </div>
              {/* Location */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-28 sm:w-36 shrink-0">{"Location:"}</span>
                <span className="text-zinc-800 font-normal">{"Gurugram, Haryana, India"}</span>
              </div>
              {/* Contributors */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-28 sm:w-36 shrink-0">{"Contributors:"}</span>
                <span className="text-zinc-800 font-normal">{"Rajesh Sharma, Priya Mehta, Arjun Verma, Neha Kapoor"}</span>
              </div>
            </div>
          </div>

          {/* Overview Block */}
          <div className="flex flex-col">
            <h2 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-6">
              {"Overview"}
            </h2>
            <div className="flex flex-col gap-6 text-zinc-800 text-sm sm:text-base leading-relaxed">
              <p>
                {"A premium mixed use development designed to bring together modern living, business, and lifestyle experiences within a single destination. The project features contemporary architecture, open green spaces, and thoughtfully planned amenities that enhance everyday life."}
              </p>
              <p>
                {"Designed with a focus on functionality and long term value, the development seamlessly integrates residential and commercial spaces while ensuring excellent connectivity, sustainability, and a vibrant community environment."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* More Projects Section */}
      <section className="relative w-full bg-white pb-24 sm:pb-32 border-t border-zinc-100 pt-16 sm:pt-12 md:pt-12">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Centered Heading */}
          <h2 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl text-center mb-16 select-none">
            {"More projects"}
          </h2>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            className="flex flex-row gap-6 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing pb-8 snap-x snap-mandatory md:snap-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {moreProjectsList.map((project) => (
              <Link
                key={project.id}
                href="/Project_Overview"
                className="flex flex-col group cursor-pointer flex-shrink-0 w-[82%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] snap-center"
              >
                {/* Project Image Container */}
                <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden bg-zinc-50 border border-zinc-100 shadow-xs">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102 select-none pointer-events-none"
                  />
                </div>

                {/* Project Details */}
                <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-orange-500/20 text-zinc-700 px-3 py-1 text-xs font-medium tracking-wide uppercase select-none">
                    {project.category}
                  </span>
                  <span className="border border-orange-500/20 text-zinc-700 px-3 py-1 text-xs font-medium tracking-wide uppercase select-none">
                    {project.location}
                  </span>
                </div>
              </Link>
            ))}
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
