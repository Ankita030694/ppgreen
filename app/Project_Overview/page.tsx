'use client';

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
  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-20">
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
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-10 flex flex-col items-start">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="border border-[#FF6A00] text-zinc-900 bg-white/40 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
              Commercial
            </span>
            <span className="border border-[#FF6A00] text-zinc-900 bg-white/40 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
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
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          
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
      <section className="relative w-full bg-white pb-24 sm:pb-32 border-t border-zinc-100 pt-16 sm:pt-20 md:pt-24">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          {/* Centered Heading */}
          <h2 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl text-center mb-16">
            {"More projects"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
            {moreProjectsList.map((project) => (
              <Link key={project.id} href="/Project_Overview" className="flex flex-col group cursor-pointer">
                {/* Project Image Container */}
                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-zinc-50 border border-zinc-100 shadow-xs">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102 select-none"
                  />
                </div>

                {/* Project Details */}
                <h3 className="text-zinc-950 font-semibold text-2xl sm:text-3xl mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-orange-500/20 text-zinc-700 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase select-none">
                    {project.category}
                  </span>
                  <span className="border border-orange-500/20 text-zinc-700 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase select-none">
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
