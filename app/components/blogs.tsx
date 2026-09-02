'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface BlogItem {
  id: string;
  image: string;
  title: string;
  description: string;
  href: string;
}

const defaultBlogs: BlogItem[] = [
  {
    id: '1',
    image: '/Blogs/1.jpg',
    title: 'MODERN LIVING: THE FUTURE OF URBAN REAL ESTATE',
    description: 'Every great development begins with a vision. Discover how thoughtful planning, sustainable construction, and modern design come together to create communities built for the future.',
    href: '/Blogs',
  },
  {
    id: '2',
    image: '/Blogs/2.jpg',
    title: 'SMART INVESTMENT STRATEGIES IN REAL ESTATE',
    description: 'Learn how choosing the right location, understanding market trends, and investing in quality developments can help maximize long term returns and financial growth.',
    href: '/Blogs',
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>(defaultBlogs);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const published = snapshot.docs
          .filter(doc => doc.data().published === true)
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              image: data.image || '/Blogs/1.jpg',
              title: data.title || '',
              description: data.subtitle || (data.description ? data.description.replace(/<[^>]*>?/gm, '').slice(0, 180) + '...' : ''),
              href: `/Blogs/${data.slug || doc.id}`,
            };
          });

        if (published.length >= 2) {
          setBlogs(published.slice(0, 2));
        } else if (published.length === 1) {
          setBlogs([published[0], defaultBlogs[1]]);
        }
      } catch (error) {
        console.error("Error fetching homepage blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const [blog1, blog2] = blogs.length >= 2 ? blogs : defaultBlogs;

  return (
    <section id="blogs" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12 sm:mb-16">
          {/* Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Blog posts
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight text-center">
            Blog articles
          </h2>

          {/* Subheading */}
          <p className="text-[#0C433C]/80 text-sm sm:text-base leading-relaxed max-w-xl text-center">
            Explore our latest insights, industry trends, and architectural inspirations.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="reveal-on-scroll reveal-delay-150 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Article 1) */}
          <Link href={blog1.href} className="flex flex-col w-full group cursor-pointer">
            {/* Image Container (Square) */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 mb-6 shadow-sm border border-zinc-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_22px_45px_-10px_rgba(12,67,60,0.28)] group-hover:border-[#0C433C]/40">
              <Image
                src={blog1.image}
                alt={blog1.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
              />
            </div>
            {/* Text details */}
            <span className="text-orange-500 font-bold text-base sm:text-lg tracking-wider uppercase mb-3 block group-hover:text-orange-600 transition-colors">
              {blog1.title}
            </span>
            <p className="text-[#0C433C]/80 text-sm sm:text-base leading-relaxed line-clamp-3">
              {blog1.description}
            </p>
          </Link>

          {/* Right Column (Article 2 & CTA) */}
          <div className="flex flex-col w-full h-full justify-between">
            <Link href={blog2.href} className="flex flex-col w-full group cursor-pointer">
              {/* Image Container (Landscape) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 mb-6 shadow-sm border border-zinc-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_22px_45px_-10px_rgba(12,67,60,0.28)] group-hover:border-[#0C433C]/40">
                <Image
                  src={blog2.image}
                  alt={blog2.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />
              </div>
              {/* Text details */}
              <span className="text-orange-500 font-bold text-base sm:text-lg tracking-wider uppercase mb-3 block group-hover:text-orange-600 transition-colors">
                {blog2.title}
              </span>
              <p className="text-[#0C433C]/80 text-sm sm:text-base leading-relaxed line-clamp-3">
                {blog2.description}
              </p>
            </Link>

            {/* CTA Button */}
            <div className="flex justify-end mt-8 sm:mt-12 md:mt-16">
              <Link href="/Blogs">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-8 py-4 uppercase tracking-wider transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer">
                  Explore More
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

