'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Navbar from '../../components/navbar';
import CTA from '../../components/cta';
import Footer from '../../components/footer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  image: string;
}

export default function BlogSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchBlog = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        let fetchedData = null;
        let fetchedId = null;

        if (!snapshot.empty) {
          fetchedData = snapshot.docs[0].data();
          fetchedId = snapshot.docs[0].id;
        } else {
          // Fallback: If slug query fails, check if the slug is actually a document ID
          const docRef = doc(db, "blogs", slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            fetchedData = docSnap.data();
            fetchedId = docSnap.id;
          }
        }

        if (fetchedData && fetchedData.published === true) {
          setBlog({ id: fetchedId, ...fetchedData } as Blog);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-white flex flex-col pt-20 justify-center items-center">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="w-full min-h-screen bg-white flex flex-col pt-20">
        <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
          <h1 className="text-3xl font-bold text-[#0C433C] mb-4">Blog Not Found</h1>
          <p className="text-[#0C433C]/80 mb-8 max-w-md">The article you are looking for does not exist or has been removed.</p>
          <Link href="/Blogs" className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors">
            Return to Insights
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] bg-zinc-950 overflow-hidden flex items-end">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={blog.image || "/Blogs/1.svg"}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover select-none pointer-events-none opacity-40"
            priority
          />
          {/* Moody gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-zinc-950/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="flex flex-col gap-6">
            
            {/* Metadata */}
            <div className="flex items-center gap-4 pb-1 md:pb-3 select-none">
              <Link href="/Blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-orange-500 font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/40"></div>
              <span className="text-white/80 font-light text-xs sm:text-sm">
                {blog.date}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/40"></div>
              <span className="text-white/80 font-light text-xs sm:text-sm">
                By {blog.author}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-[#F9CC94] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl">
                {blog.title}
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* Blog Article Section */}
      <section className="relative w-full bg-white text-[#0C433C] py-16 sm:py-24">
        {/* Back sketch background */}
        <div className="absolute right-[-5%] top-[10%] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] opacity-[0.04] pointer-events-none select-none">
          <Image
            src="/back_sketch.svg"
            alt="Architectural background element"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-zinc prose-lg lg:prose-xl max-w-none prose-headings:font-semibold prose-headings:text-[#0C433C] text-[#0C433C] prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-xl">
            {/* We render the HTML description directly */}
            <div dangerouslySetInnerHTML={{ __html: blog.description.replace(/\n/g, '<br/>') }} />
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
