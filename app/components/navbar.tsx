'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide the global navbar on admin and login routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/About_us' },
    { label: 'BLOGS', href: '/Blogs' },
    { label: 'PORTFOLIO', href: '/Portfolio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl">
        <nav className="w-full grid grid-cols-2 md:grid-cols-3 items-center px-6 py-3 border border-orange-500 bg-black/50 backdrop-blur-md shadow-lg transition-all duration-300 font-sans text-sm font-semibold tracking-wider">
          {/* Left Side: Logo */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/PP-Green Logo.svg"
                alt="PP Green City 2 Logo"
                width={213}
                height={35}
                className="h-7 w-auto object-contain md:h-8"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-2 text-xs font-light tracking-widest text-zinc-300 transition-colors duration-300 group hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side: Desktop Book Appointment Button & Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-4">
            {/* Desktop Book Appointment Button */}
            <Link
              href="/ContactUs"
              className="hidden md:flex items-center justify-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all duration-300 text-white text-xs font-medium tracking-widest"
            >
              BOOK APPOINTMENT
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center justify-center p-1.5 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <Image
                  src="/Nav_ham.svg"
                  alt="Open menu"
                  width={24}
                  height={24}
                  unoptimized
                  className="h-6 w-6 object-contain"
                />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-x-4 top-6 z-[100] md:hidden bg-[#2D3134]/95 backdrop-blur-md border border-orange-500 p-6 sm:p-8 flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Top Row: Logo & Close Button */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/PP-Green Logo.svg"
                  alt="PP Green City 2 Logo"
                  width={150}
                  height={25}
                  className="h-6 w-auto object-contain"
                  unoptimized
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 text-orange-500 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links Stack */}
            <div className="flex flex-col gap-6 font-sans">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl sm:text-2xl font-light tracking-widest text-white transition-colors duration-300 uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/ContactUs"
                onClick={() => setIsOpen(false)}
                className="text-xl sm:text-2xl font-medium tracking-widest text-orange-500 transition-colors duration-300 uppercase"
              >
                {"BOOK APPOINTMENT"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
