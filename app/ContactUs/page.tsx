'use client';

import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ContactUs() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 
        Note: Navbar is imported from components and rendered globally inside layout.tsx.
        We keep the import here to verify module status and support standard imports.
      */}

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[85vh] bg-black overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Contact_Us/1.svg"
            alt="Get In Touch"
            fill
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority
          />
        </div>
        
        {/* Darkening Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45 z-0" />

        {/* Hero Title */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="text-white font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] leading-none tracking-tight">
            Get In Touch
          </h1>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
