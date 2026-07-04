'use client';

import Image from 'next/image';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full flex flex-col">
      
      {/* Logo Banner (Top Half) */}
      <div className="bg-black py-16 sm:py-20 flex items-center justify-center w-full px-4 border-b border-zinc-900">
        <div className="relative w-full max-w-[650px] h-[100px] sm:h-[130px]">
          <Image
            src="/PP-Green Logo.svg"
            alt="PP Green City 2 Sonipat Logo"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-contain select-none pointer-events-none"
            priority={false}
          />
        </div>
      </div>

      {/* Details & Navigation Block (Bottom Half) */}
      <div className="bg-[#0a0a0a] text-white pt-16 pb-12 w-full">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Navigation Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            
            {/* Left side links */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#"
                onClick={handleScrollToTop}
                className="text-sm sm:text-base font-medium text-zinc-300 hover:text-orange-500 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm sm:text-base font-medium text-zinc-300 hover:text-orange-500 transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="#services"
                className="text-sm sm:text-base font-medium text-zinc-300 hover:text-orange-500 transition-colors duration-300"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-sm sm:text-base font-medium text-zinc-300 hover:text-orange-500 transition-colors duration-300"
              >
                Portfolio
              </a>
            </div>

            {/* Right side links */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-zinc-400 text-sm sm:text-base">
              <a
                href="#cta"
                className="hover:text-orange-500 transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition-colors duration-300"
              >
                Terms & Privacy
              </a>
            </div>

          </div>

          {/* Divider line */}
          <div className="w-full border-t border-zinc-800/80 mb-8" />

          {/* Bottom Row: Copyright & Social handles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <span className="text-zinc-500 text-xs sm:text-sm text-center sm:text-left select-none">
              © 2026, All rights reserved by PP Green City
            </span>

            {/* Social handles */}
            <div className="flex items-center gap-6">
              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 relative transition-transform duration-300 hover:scale-110 active:scale-95"
                aria-label="X (formerly Twitter)"
              >
                <Image
                  src="/Socials/X.svg"
                  alt="X"
                  width={20}
                  height={20}
                  className="object-contain select-none pointer-events-none"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 relative transition-transform duration-300 hover:scale-110 active:scale-95"
                aria-label="Instagram"
              >
                <Image
                  src="/Socials/Instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="object-contain select-none pointer-events-none"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 relative transition-transform duration-300 hover:scale-110 active:scale-95"
                aria-label="LinkedIn"
              >
                <Image
                  src="/Socials/Linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="object-contain select-none pointer-events-none"
                />
              </a>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
