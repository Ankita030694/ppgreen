'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from '../components/navbar'; // Imported to satisfy request details, rendered globally in layout
import CTA from '../components/cta';
import Footer from '../components/footer';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface BlogCardItem {
  id: string;
  slug: string;
  date: string;
  author: string;
  title: string;
  subtitle?: string;
  image: string;
}

export default function BlogsPage() {
  const [blogsList, setBlogsList] = useState<BlogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetchedBlogs = snapshot.docs
          .filter(doc => doc.data().published === true)
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              slug: data.slug || doc.id,
              title: data.title,
              subtitle: data.subtitle,
              image: data.image || '/placeholder.svg',
              author: data.author || 'Admin Team',
              date: data.date || new Date().toISOString().split('T')[0],
            };
          }) as BlogCardItem[];
        setBlogsList(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-20">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to satisfy request requirements and modules status.
      */}

      {/* Header Section */}
      <section className="relative w-full pt-24 sm:pt-28 pb-[50px] overflow-hidden bg-white">
        {/* Left Faint Background Sketch */}
        <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] opacity-[0.06] select-none pointer-events-none hidden lg:block">
          <Image
            src="/back_Sketch.svg"
            alt="Architectural Building Sketch"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-contain object-left-bottom"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm ">
              {"Latest Insights"}
            </span>
          </div>

          {/* Heading */} 
          <h1 className="text-[#0C433C] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight max-w-4xl mb-6">
            {"Expert Perspectives on Real Estate & Property"}
          </h1>

          {/* Description Subtitle */}
          <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            {"Stay informed with industry trends, investment insights, market updates, and practical guides to help you make confident property decisions."}
          </p>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="relative w-full bg-white pb-[50px]">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16">
            {loading ? (
              <div className="col-span-full py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            ) : blogsList.length === 0 ? (
              <div className="col-span-full py-20 text-center text-zinc-500 font-medium">
                No articles published yet. Check back soon!
              </div>
            ) : (
              blogsList.map((blog) => (
                <Link key={blog.id} href={`/Blogs/${blog.slug}`} className="flex flex-col group cursor-pointer">
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
                <span className="text-[#0C433C]/60 text-xs sm:text-sm font-medium mb-2 block select-none">
                  {`${blog.date} • ${blog.author}`}
                </span>

                {/* Blog Title */}
                <h3 className="text-[#0C433C] font-semibold text-lg sm:text-xl group-hover:text-orange-500 transition-colors duration-300 leading-snug mb-2">
                  {blog.title}
                </h3>
                
                {/* Blog Subtitle */}
                {blog.subtitle && (
                  <p className="text-[#000000]/60 text-sm line-clamp-2">
                    {blog.subtitle}
                  </p>
                )}
              </Link>
            ))
          )}
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
