'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/#about' },
    { label: 'SERVICES', href: '/#services' },
    { label: 'PORTFOLIO', href: '/Portfolio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl">
        <nav className="flex items-stretch justify-between gap-4 font-sans text-sm font-semibold tracking-wider">
          {/* Left Side: Logo and Navigation Links */}
          <div className="flex items-stretch gap-3 md:gap-4 flex-1 md:flex-none">
            {/* Logo Container */}
            <div className="flex items-center justify-center px-4 py-3 border border-orange-500 bg-black/50 backdrop-blur-md shadow-lg transition-all duration-300">
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

            {/* Desktop Navigation Links Container */}
            <div className="hidden md:flex items-center gap-8 px-8 border border-orange-500 bg-black/50 backdrop-blur-md shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative py-2 text-xs font-light tracking-widest text-zinc-300 hover:text-orange-500 transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px]  transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Desktop Book Appointment Button & Mobile Menu Toggle */}
          <div className="flex items-stretch">
            {/* Desktop Book Appointment Button */}
            <Link
              href="/ContactUs"
              className="hidden md:flex items-center justify-center px-6 border border-orange-500 bg-black/50 hover:text-orange-500 backdrop-blur-md shadow-lg active:scale-[0.98] transition-all duration-300 text-white text-xs font-light tracking-widest"
            >
              BOOK APPOINTMENT
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center justify-center p-3.5 border border-orange-500 bg-black/40 backdrop-blur-md shadow-lg text-white hover:bg-orange-500/10 transition-colors duration-300 focus:outline-none"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 border border-orange-500 bg-black/80 backdrop-blur-lg shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-5">
            <div className="flex flex-col p-6 gap-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-xs font-bold tracking-widest text-zinc-300 hover:text-white border-b border-zinc-800 hover:border-orange-500 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/ContactUs"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-3 border border-orange-500 bg-orange-500/10 hover:bg-orange-500/20 active:scale-[0.98] transition-all duration-300 text-white text-xs font-bold tracking-widest"
              >
                BOOK APPOINTMENT
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
