'use client';

import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from '../components/navbar'; // Imported to satisfy request details, rendered globally in layout
import CTA from '../components/cta';
import Footer from '../components/footer';

interface BlogCardItem {
  id: number;
  date: string;
  author: string;
  title: string;
  image: string;
}

const blogsList: BlogCardItem[] = [
  {
    id: 1,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
  {
    id: 2,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
  {
    id: 3,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
  {
    id: 4,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
  {
    id: 5,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
  {
    id: 6,
    date: 'Jul 12, 2026',
    author: 'PP Green',
    title: '5 Features Every Modern Luxury Home Should Have',
    image: '/Blogs/1.svg',
  },
];

export default function BlogsPage() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-20">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to satisfy request requirements and modules status.
      */}

      {/* Header Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-28 overflow-hidden bg-white">
        {/* Left Faint Background Sketch */}
        <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] opacity-[0.06] select-none pointer-events-none hidden lg:block">
          <Image
            src="/back_sketch.svg"
            alt="Architectural sketch outline background"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm ">
              {"Latest Insights"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-zinc-950 font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight max-w-4xl mb-6">
            {"Expert Perspectives on Real Estate & Property"}
          </h1>

          {/* Description Subtitle */}
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            {"Stay informed with industry trends, investment insights, market updates, and practical guides to help you make confident property decisions."}
          </p>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="relative w-full bg-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16">
            {blogsList.map((blog) => (
              <div key={blog.id} className="flex flex-col group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-square w-full mb-6 overflow-hidden bg-zinc-50 border border-zinc-100 shadow-xs">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102 select-none"
                  />
                </div>

                {/* Date & Author Info */}
                <span className="text-zinc-500 text-xs sm:text-sm font-medium mb-2 block select-none">
                  {`${blog.date} • ${blog.author}`}
                </span>

                {/* Blog Title */}
                <h3 className="text-zinc-950 font-semibold text-lg sm:text-xl group-hover:text-orange-500 transition-colors duration-300 leading-snug">
                  {blog.title}
                </h3>
              </div>
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
