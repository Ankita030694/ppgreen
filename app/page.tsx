'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Testimonials from './components/testimonials';
import FAQ from './components/faq';
import Blogs from './components/blogs';
import CTA from './components/cta';
import Footer from './components/footer';

// ==========================================
// 1. Animated Counter Component
// ==========================================
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({
  value,
  duration = 1500,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            
            setCount(Math.floor(easeProgress * value));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// 2. About Section Component

function About() {
  return (
    <section id="about" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden">
      {/* Background Architectural Sketch Illustration on Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-full sm:w-[55%] lg:w-[42%] max-w-[650px] opacity-100 select-none pointer-events-none z-0">
        <Image
          src="/back_Sketch.svg"
          alt="Architectural building sketch background"
          fill
          unoptimized
          className="object-contain object-left"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header Block: Pill, Main Heading, Subheading */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Category Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              About Us
            </span>
          </div>
          
          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight mb-6 text-center">
            Creating Value. Building Trust. Shaping the Future.
          </h2>
          
          {/* Description Paragraph / Subheading */}
          <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed max-w-3xl mb-4 text-center">
            Driven by a commitment to excellence, continuous improvement and the creation of enduring value. With a strong focus on quality, innovation and customer-centricity, projects are thoughtfully planned, meticulously executed and designed to stand the test of time.
          </p>

          <p className="text-[#000000]/80 text-sm sm:text-base leading-relaxed max-w-xl text-center">
            PP Green City 2 is situated in the prime location of Sonipat, offering a harmonious blend of green surroundings and urban amenities.
          </p>
        </div>

        {/* Stats Row */}
        <div className="reveal-on-scroll reveal-delay-150 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 border-t border-zinc-200 max-w-4xl mx-auto text-center">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
              <AnimatedCounter value={15} suffix="M+" />
            </span>
            <span className="text-[#000000] font-semibold text-xs sm:text-sm mt-2 leading-tight">
              Sq. Ft. of Spaces
            </span>
          </div>
          
          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
              <AnimatedCounter value={100} suffix="+" />
            </span>
            <span className="text-[#000000] font-semibold text-xs sm:text-sm mt-2 leading-tight">
              Delivered Projects
            </span>
          </div>
          
          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
              <AnimatedCounter value={15} suffix="k+" />
            </span>
            <span className="text-[#000000] font-semibold text-xs sm:text-sm mt-2 leading-tight">
              Happy Families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Offers Section Component
interface OfferItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description?: string;
}

const offersList: OfferItem[] = [
  {
    id: 1,
    image: '/PP City Centre/pic-3.jpg',
    category: 'Commercial',
    title: 'PP City Centre',
  },
  {
    id: 2,
    image: '/West End Convention Mall/west3-1.jpg',
    category: 'Commercial',
    title: 'West End Convention Mall',
  },
  {
    id: 3,
    image: '/PP Trade Centre/pp_trade_centre.jpg',
    category: 'Commercial',
    title: 'PP Trade Centre',
  },
  {
    id: 4,
    image: '/33-scaled.jpg',
    category: 'Commercial',
    title: 'Mohali Walk',
  },
  {
    id: 5,
    image: '/AP Wonders/Copy of ChatGPT Image Mar 10, 2026 at 01_33_20 AM.png',
    category: 'Residential',
    title: 'AP Wonder',
  },
  {
    id: 6,
    image: '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_30_21 AM.png',
    category: 'Residential',
    title: 'PP Green City',
  },
];

function Offers() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicated 3x for seamless infinite looping
  const displayList = [...offersList, ...offersList, ...offersList];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Initialize scroll position to the start of the middle set
    const setWidth = slider.scrollWidth / 3;
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = setWidth;
    }

    const handleScroll = () => {
      if (!slider) return;
      const currentSetWidth = slider.scrollWidth / 3;

      // Silent reset without smooth animation when reaching outer boundaries
      if (slider.scrollLeft >= currentSetWidth * 2) {
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft -= currentSetWidth;
      } else if (slider.scrollLeft <= 5) {
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft += currentSetWidth;
      }
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });

    const autoSlideTimer = setInterval(() => {
      if (sliderRef.current && !isHovered) {
        const s = sliderRef.current;
        s.style.scrollBehavior = 'smooth';
        const card = s.firstElementChild as HTMLElement;
        const cardWidth = card ? card.offsetWidth + 24 : 380;
        s.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 2500);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearInterval(autoSlideTimer);
    };
  }, [isHovered]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const s = sliderRef.current;
      s.style.scrollBehavior = 'smooth';
      const card = s.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      s.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const s = sliderRef.current;
      s.style.scrollBehavior = 'smooth';
      const card = s.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      s.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12">
          {/* Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-[#0C433C] font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              What We Offer
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight text-center">
            Building Tomorrow’s landmarks 
          </h2>
          
          {/* Description */}
          <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed max-w-2xl text-center">
            Creating residential and commercial developments that redefine modern living and investment opportunities.
          </p>

          {/* Slider controls */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center w-12 h-12 bg-black hover:bg-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="flex items-center justify-center w-12 h-12 bg-black hover:bg-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="reveal-on-scroll reveal-delay-150 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayList.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/Project_Overview?title=${encodeURIComponent(item.title)}`}
              className="flex-shrink-0 w-[85vw] sm:w-[540px] lg:w-[711px] max-w-[711px] snap-start group block cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[711/500] w-full overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_-12px_rgba(12,67,60,0.3)] group-hover:border-[#0C433C]/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  priority={index < 3}
                />
                
                {/* Gradient & Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Card Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase mb-1 select-none">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-white group-hover:text-orange-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-zinc-300 leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-in-out text-zinc-300">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}


// ==========================================
// 4. Reels Carousel Section Component (9:16 Aspect Ratio)
// ==========================================

interface ReelItem {
  id: number;
  title: string;
  video: string;
}

const reelsList: ReelItem[] = [
  {
    id: 1,
    title: 'PP Green Living',
    video: '/Reels/Reel_1.mp4',
  },
  {
    id: 2,
    title: 'Community & Lifestyle',
    video: '/Reels/Reel 2_1.mp4',
  },
  {
    id: 3,
    title: 'Happy Families at PP Green',
    video: '/Reels/Copy of PP Green Mother & Son Reel_1.mp4',
  },
  {
    id: 4,
    title: 'Client Experience - Gagan',
    video: '/Reels/PP Green Gagan Reel_1.mp4',
  },
  {
    id: 5,
    title: 'Client Testimonial - Sarita',
    video: '/Reels/PP Green Sarita Reel_1.mp4',
  },
  {
    id: 6,
    title: 'Behind the Scenes - Our Staff',
    video: '/Reels/PP Green Staff Reel (1)_1.mp4',
  },
];

function Reels() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [unmutedId, setUnmutedId] = useState<number | null>(null);

  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>('.reel-video').forEach((v) => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const toggleMute = (id: number) => {
    const nextUnmutedId = unmutedId === id ? null : id;
    setUnmutedId(nextUnmutedId);

    document.querySelectorAll<HTMLVideoElement>('.reel-video').forEach((v) => {
      if (v.id === `reel-video-${id}`) {
        v.muted = nextUnmutedId === null;
        if (v.paused) {
          v.play().catch(() => {});
        }
      } else {
        v.muted = true;
      }
    });
  };

  return (
    <section id="reels" className="relative w-full bg-[#0C433C] text-[#F9CC94] py-[50px] overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12">
          {/* Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-[#F9CC94] font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#F9CC94] font-regular tracking-widest text-xs sm:text-sm uppercase">
              Life at PP Green
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F9CC94] leading-[1.15] tracking-tight text-center">
            Watch Our Stories 
          </h2>
          
          {/* Description */}
          <p className="text-[#F9CC94] text-sm sm:text-base leading-relaxed max-w-2xl text-center">
            Experience the vibrant community, customer stories, and behind-the-scenes moments at PP Green City.
          </p>

          {/* Slider controls */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center w-12 h-12 bg-[#F9CC94] border-zinc-800 text-black transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous reel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="flex items-center justify-center w-12 h-12 bg-[#F9CC94] border-zinc-800 text-black transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Next reel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Container (Not Draggable, Manual Control Only, No Auto Animation) */}
        <div
          ref={sliderRef}
          className="reveal-on-scroll reveal-delay-150 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[320px] snap-start group"
            >
              {/* Card Container in 9:16 Aspect Ratio */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-900 shadow-lg rounded-none transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-8px_rgba(12,67,60,0.45)] group-hover:ring-1 group-hover:ring-[#0C433C]/60">
                <video
                  id={`reel-video-${item.id}`}
                  src={item.video}
                  autoPlay
                  playsInline
                  loop
                  muted={unmutedId !== item.id}
                  className="reel-video w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Card Title Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 pr-16 text-white z-10 pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase mb-1 block select-none">
                    PP Green Reel
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Volume Mute/Unmute Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleMute(item.id)}
                  className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
                  aria-label={unmutedId === item.id ? "Mute Reel" : "Unmute Reel"}
                  title={unmutedId === item.id ? "Mute" : "Unmute"}
                >
                  {unmutedId === item.id ? (
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



// ==========================================
// 5. Our Expertise Section Component (Hover Accordion)
// ==========================================
interface ExpertiseItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

const expertiseList: ExpertiseItem[] = [
  {
    id: 1,
    image: '/1.jpeg',
    category: 'Residential',
    title: 'Residential Communities',
    description: 'We build elegant residential towers, luxury apartments, and master-planned villa communities offering premium lifestyles, rich green spaces, and a strong sense of community.',
  },
  {
    id: 2,
    image: '/33-scaled.jpg',
    category: 'Commercial',
    title: 'Commercial Properties',
    description: 'We design premium commercial centers, retail malls, and corporate offices in high-traffic zones, combining architectural innovation with commercial viability to attract leading brands.',
  },
  {
    id: 3,
    image: '/hover_effect/3.svg',
    category: 'Industrial',
    title: 'Industrial Developments',
    description: 'We develop efficient industrial spaces built for productivity, scalability, and long term operational success. Our projects prioritize functionality, strategic locations, and modern infrastructure to support growing businesses.',
  },
];

function Expertise() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="expertise" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12">
          {/* Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Our Expertise
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight text-center">
            Building Excellence Across Every Sector
          </h2>
        </div>

        {/* Desktop View: Hover Accordion */}
        <div className="reveal-on-scroll reveal-delay-150 hidden lg:flex w-full gap-6 h-[500px]">
          {expertiseList.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className="relative h-full overflow-hidden transition-all duration-500 ease-in-out cursor-pointer shadow-sm border border-zinc-100"
                style={{ flex: isActive ? 1.8 : 0.6 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out select-none pointer-events-none"
                  priority={item.id === 1}
                />
                
                {/* Gradient & Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
                
                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase mb-1.5 select-none">
                    {item.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight mb-2 select-none text-white">
                    {item.title}
                  </h3>
                  
                  {/* Expanded Description */}
                  <p
                    className="text-sm text-zinc-200 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out text-zinc-200"
                    style={{
                      maxHeight: isActive ? '160px' : '0px',
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? '8px' : '0px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Horizontal Scroll-Snap Slider */}
        <div
          className="flex lg:hidden gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {expertiseList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 50vw"
                  className="object-cover select-none pointer-events-none"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase mb-1 select-none">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-200 leading-relaxed text-zinc-200">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 6. Why Choose Us Section Component
// ==========================================

function WhyChoose() {
  return (
    <section id="why-choose-us" className="relative w-full bg-white text-[#0C433C] py-[50px] overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-12 sm:mb-16">
          {/* Left Side Tagline / Pill */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-[#0C433C]/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Why choose us
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C433C] leading-[1.15] tracking-tight text-center">
            Building Exceptional Spaces Across India
          </h2>
          
          {/* Description */}
          <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed max-w-2xl text-center">
            We develop premium residential and commercial properties with quality, innovation, and lasting value.
          </p>
        </div>

        {/* Desktop View: Bento Grid */}
        <div className="reveal-on-scroll reveal-delay-150 hidden md:grid grid-cols-3 gap-6 mb-16 sm:mb-20">
          {/* Card 1 */}
          <div className="relative h-[480px] w-full overflow-hidden bg-zinc-950 group shadow-sm border border-zinc-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-10px_rgba(12,67,60,0.45)] hover:border-[#0C433C]/70">
            {/* Blurred Background Layer */}
            <Image
              src="/500_cr.png"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/500_cr.png"
                  alt="Value Delivered"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20 pointer-events-none">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
                100+ Projects
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xs text-zinc-300">
                Value Delivered Across Residential & Commercial Projects
              </p>
            </div>
          </div>

          {/* Column 2: Card 2 & 3 */}
          <div className="flex flex-col gap-6 h-[480px]">
            {/* Card 2 */}
            <div className="flex-1 relative overflow-hidden bg-zinc-950 p-8 text-white flex flex-col justify-end group shadow-sm border border-zinc-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(12,67,60,0.4)] hover:border-[#0C433C]/70">
              {/* Blurred Background Layer */}
              <Image
                src="/200_plus.png"
                alt=""
                fill
                unoptimized
                className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
              />
              {/* Contained Foreground Layer */}
              <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="/200_plus.png"
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
              <div className="relative z-20 pointer-events-none">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 block text-white">
                  100+
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-[240px] text-zinc-300">
                  Projects Delivered Across India
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-1 relative overflow-hidden bg-zinc-950 p-8 text-white flex flex-col justify-end group shadow-sm border border-zinc-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(12,67,60,0.4)] hover:border-[#0C433C]/70">
              {/* Blurred Background Layer */}
              <Image
                src="/15M_plus.png"
                alt=""
                fill
                unoptimized
                className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
              />
              {/* Contained Foreground Layer */}
              <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="/15M_plus.png"
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
              <div className="relative z-20 pointer-events-none">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 block text-white">
                  15M+ sq. ft.
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-[240px] text-zinc-300">
                  Sq. Ft. of Spaces
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative h-[480px] w-full overflow-hidden bg-zinc-950 group shadow-sm border border-zinc-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-10px_rgba(12,67,60,0.45)] hover:border-[#0C433C]/70">
            {/* Blurred Background Layer */}
            <Image
              src="/15000_plus.jpg"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/15000_plus.jpg"
                  alt="Happy Homeowners"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20 pointer-events-none">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                15,000+
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xs">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View: Horizontal Scroll-Snap Slider (same size cards) */}
        <div
          className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide -ml-4 pl-8 -mr-4 pr-4 mb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-950 shadow-sm border border-zinc-100">
            {/* Blurred Background Layer */}
            <Image
              src="/500_cr.png"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-3 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/500_cr.png"
                  alt="Value Delivered"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 50vw"
                  className="object-contain select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20 pointer-events-none">
              <span className="text-2xl font-bold tracking-tight mb-1.5">
                100+ Projects
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Value Delivered Across Residential & Commercial Projects
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-950 p-6 text-white flex flex-col justify-end shadow-sm border border-zinc-800">
            {/* Blurred Background Layer */}
            <Image
              src="/200_plus.png"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-3 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/200_plus.png"
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 50vw"
                  className="object-contain select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 pointer-events-none">
              <span className="text-2xl font-bold tracking-tight mb-1.5 block text-white">
                100+
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-zinc-300">
                Projects Delivered Across India
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-950 p-6 text-white flex flex-col justify-end shadow-sm border border-zinc-800">
            {/* Blurred Background Layer */}
            <Image
              src="/15M_plus.png"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-3 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/15M_plus.png"
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 50vw"
                  className="object-contain select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 pointer-events-none">
              <span className="text-2xl font-bold tracking-tight mb-1.5 block text-white">
                15M+ sq. ft.
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-zinc-300">
                Sq. Ft. of Spaces
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-950 shadow-sm border border-zinc-100">
            {/* Blurred Background Layer */}
            <Image
              src="/15000_plus.jpg"
              alt=""
              fill
              unoptimized
              className="object-cover blur-md scale-110 opacity-40 select-none pointer-events-none"
            />
            {/* Contained Foreground Layer */}
            <div className="absolute inset-0 p-3 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/15000_plus.jpg"
                  alt="Happy Homeowners"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 50vw"
                  className="object-contain select-none"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20 pointer-events-none">
              <span className="text-2xl font-bold tracking-tight mb-1.5 text-white">
                15,000+
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-zinc-300">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Built on Trust Sub-section */}
        <div className="reveal-on-scroll reveal-delay-150 flex flex-col items-center pt-16 sm:pt-20">
          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl font-semibold text-[#0C433C] leading-[1.2] tracking-tight text-center mb-10 sm:mb-12">
            Built on Trust & Excellence
          </h3>

          {/* Right Column: Two Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl w-full">
            {/* Feature 1 */}
            <div className="flex flex-col items-start gap-4 group p-6 sm:p-8 rounded-2xl bg-zinc-50/50 border border-zinc-100 transition-all duration-300 hover:bg-white hover:border-[#0C433C]/30 hover:shadow-[0_16px_34px_-8px_rgba(12,67,60,0.16)] hover:-translate-y-1">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Built_Trust/1.svg"
                  alt="Faster Project Delivery"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#0C433C]">
                Faster Project Delivery
              </h4>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed">
                We streamline planning, approvals, and execution to ensure projects are delivered on time without compromising quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start gap-4 group p-6 sm:p-8 rounded-2xl bg-zinc-50/50 border border-zinc-100 transition-all duration-300 hover:bg-white hover:border-[#0C433C]/30 hover:shadow-[0_16px_34px_-8px_rgba(12,67,60,0.16)] hover:-translate-y-1">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Built_Trust/2.svg"
                  alt="Quality You Can Trust"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#0C433C]">
                Quality You Can Trust
              </h4>
              <p className="text-[#000000]/60 text-sm sm:text-base leading-relaxed">
                Every development is built with premium materials, expert craftsmanship, and attention to every detail.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 7. Main Page Component
// ==========================================
export default function Home() {
  return (
    <main className="w-full bg-black">
      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-end text-white font-sans overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Copy of PP Green Drone Reel (1).webm" type="video/webm" />
            <source src="/Copy of PP Green Drone Reel (1).mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent h-48" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-8xl w-full px-4 sm:px-6 lg:px-8 pb-11 sm:pb-12 md:pb-16 flex flex-col justify-end">
          {/* Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F9CC94] max-w-4xl leading-[1.15] mb-3 sm:mb-8 select-none">
            Where Vision Meets Reality
          </h1>

          {/* Description Text */}
          <p className="text-zinc-300 text-xs sm:text-base leading-relaxed max-w-sm sm:max-w-md">
            Discover thoughtfully planned properties in prime locations, backed by trusted expertise and a seamless buying experience.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <About />

      {/* What We Offer Section */}
      <Offers />

      {/* Reels Stories Section */}
      <Reels />

      {/* Our Expertise Section */}
      <Expertise />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Blogs Section */}
      <Blogs />

      {/* CTA Section */}
      <CTA />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
