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
    <section id="about" className="relative w-full bg-white text-black pt-16 sm:pt-24 overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Tagline & Sketch Image */}
          <div className="lg:col-span-5 flex flex-col gap-2 w-full">
            {/* Category Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm">
                About Us
              </span>
            </div>
            
            {/* Sketch Building Image */}
            <div className="relative hidden lg:flex w-full max-w-xl mx-auto lg:mx-0 aspect-4/3 items-center justify-center lg:mt-2">
              <Image
                src="/back_Sketch.svg"
                alt="Architectural Building Sketch"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain opacity-85 select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                priority={false}
              />
            </div>
          </div>

          {/* Right Column: Title, Description, and Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-2 lg:pt-10">
            {/* Section Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight mb-6">
              Building India’s Future Through Thoughtful Real Estate Development
            </h2>
            
            {/* Description Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-12 max-w-2xl">
              A trusted real estate company creating premium residential and commercial spaces across India. We combine quality construction, prime locations, and modern design to deliver lasting value and exceptional living experiences.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 border-t border-zinc-200">
              {/* Stat 1 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
                  <AnimatedCounter value={15} suffix="M+" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Sq. Ft. of Spaces
                </span>
              </div>
              
              {/* Stat 2 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
                  <AnimatedCounter value={200} suffix="+" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Projects Delivered
                </span>
              </div>
              
              {/* Stat 3 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
                  <AnimatedCounter value={15000} suffix="+" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Happy Customers
                </span>
              </div>
            </div>
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
    image: "/PP-Green-City.jpg",
    category: 'Commercial',
    title: 'PP City Centre',
  },
  {
    id: 2,
    image: '/west_end_convention_mall.jpg',
    category: 'Commercial',
    title: 'West End Convention Mall',
  },
  {
    id: 3,
    image: '/Copy of ChatGPT Image Mar 10, 2026 at 12_34_21 AM.png',
    category: 'Commercial',
    title: 'PP Trade Centre',
  },
  {
    id: 4,
    image: '/33-scaled.jpg',
    category: 'Residential',
    title: 'Mohali Walk',
  },
  {
    id: 5,
    image: '/Copy of ChatGPT Image Mar 10, 2026 at 01_33_20 AM.png',
    category: 'Residential',
    title: 'AP Wonder',
  },
  {
    id: 6,
    image: '/Copy of ChatGPT Image Mar 10, 2026 at 01_30_21 AM.png',
    category: 'Plots',
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
    <section id="portfolio" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl flex flex-col gap-4">
            {/* Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm ">
                What We Offer
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight">
              Building Tomorrow’s landmarks
            </h2>
            
            {/* Description */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Creating residential and commercial developments that redefine modern living and investment opportunities.
            </p>
          </div>

          {/* Slider controls (Desktop) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayList.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/Project_Overview?title=${encodeURIComponent(item.title)}`}
              className="flex-shrink-0 w-[85vw] sm:w-[540px] lg:w-[711px] max-w-[711px] snap-start group block cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[711/400] w-full overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 transition-all duration-300">
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
                  <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-1 select-none">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-orange-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-zinc-300 leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-in-out">
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
  const [playingId, setPlayingId] = useState<number | null>(null);

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

  const togglePlay = (id: number, videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    if (playingId === id) {
      videoEl.pause();
      setPlayingId(null);
    } else {
      document.querySelectorAll<HTMLVideoElement>('.reel-video').forEach((v) => v.pause());
      videoEl.play();
      setPlayingId(id);
    }
  };

  return (
    <section id="reels" className="relative w-full bg-zinc-950 text-white py-16 sm:py-24 overflow-hidden border-t border-zinc-900">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl flex flex-col gap-4">
            {/* Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-zinc-400 font-regular tracking-widest text-xs sm:text-sm uppercase">
                Life at PP Green
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
              Watch Our Stories & Reels
            </h2>
            
            {/* Description */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Experience the vibrant community, customer stories, and behind-the-scenes moments at PP Green City.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center w-12 h-12 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous reel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="flex items-center justify-center w-12 h-12 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-colors duration-300 shadow-md active:scale-95 focus:outline-none cursor-pointer"
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[320px] snap-start group"
            >
              {/* Card Container in 9:16 Aspect Ratio */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-900 shadow-lg border border-zinc-800/80 rounded-none transition-all duration-300">
                <video
                  id={`reel-video-${item.id}`}
                  src={item.video}
                  playsInline
                  loop
                  muted={playingId !== item.id}
                  className="reel-video w-full h-full object-cover select-none"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Play/Pause Button Overlay */}
                <button
                  type="button"
                  onClick={() => {
                    const videoEl = document.getElementById(`reel-video-${item.id}`) as HTMLVideoElement | null;
                    togglePlay(item.id, videoEl);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300 cursor-pointer group/btn"
                  aria-label={playingId === item.id ? "Pause Reel" : "Play Reel"}
                >
                  <div className="w-14 h-14 rounded-full bg-[#0C433C]/90 text-white flex items-center justify-center shadow-xl backdrop-blur-xs transition-transform duration-300 group-hover/btn:scale-110">
                    {playingId === item.id ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Card Title Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-1 block select-none">
                    PP Green Reel
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-white leading-snug">
                    {item.title}
                  </h3>
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
    image: '/hover_effect/1.svg',
    category: 'Residential',
    title: 'Residential Communities',
    description: 'We develop efficient industrial spaces built for productivity, scalability, and long term operational success. Our projects prioritize functionality, strategic locations, and modern infrastructure to support growing businesses.',
  },
  {
    id: 2,
    image: '/hover_effect/2.svg',
    category: 'Commercial',
    title: 'Commercial Properties',
    description: 'We design premium commercial centers, retail malls, and corporate offices in high-traffic zones, combining architectural innovation with commercial viability to attract leading brands.',
  },
  {
    id: 3,
    image: '/hover_effect/3.svg',
    category: 'Industrial',
    title: 'Industrial Developments',
    description: 'We build elegant residential towers, luxury apartments, and master-planned villa communities offering premium lifestyles, rich green spaces, and a strong sense of community.',
  },
];

function Expertise() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="expertise" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl flex flex-col gap-4">
            {/* Tagline */}
            <div className="flex items-center gap-2.5">
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
              <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
                Our Expertise
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight">
              Building Excellence Across Every Sector
            </h2>
          </div>
        </div>

        {/* Desktop View: Hover Accordion */}
        <div className="hidden lg:flex w-full gap-6 h-[500px]">
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
                  <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-1.5 select-none">
                    {item.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight mb-2 select-none">
                    {item.title}
                  </h3>
                  
                  {/* Expanded Description */}
                  <p
                    className="text-sm text-zinc-300 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out"
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
                  <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-1 select-none">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
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
    <section id="why-choose-us" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden border-t border-zinc-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left Side Tagline */}
          <div className="lg:col-span-4 flex items-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Why choose us
            </span>
          </div>

          {/* Right Side Headline & Description */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight max-w-3xl">
              Building Exceptional Spaces Across India
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              We develop premium residential and commercial properties with quality, innovation, and lasting value.
            </p>
          </div>
        </div>

        {/* Desktop View: Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-16 sm:mb-20">
          {/* Card 1 */}
          <div className="relative h-[480px] w-full overflow-hidden bg-zinc-900 group shadow-sm border border-zinc-100">
            <Image
              src="/Why_choose/1st.svg"
              alt="Value Delivered"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                ₹500 Cr+
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xs">
                Value Delivered Across Residential & Commercial Projects
              </p>
            </div>
          </div>

          {/* Column 2: Card 2 & 3 */}
          <div className="flex flex-col gap-6 h-[480px]">
            {/* Card 2 */}
            <div className="flex-1 relative overflow-hidden bg-zinc-900 p-8 text-white flex flex-col justify-end group shadow-sm border border-zinc-800">
              <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-35 select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src="/Why_choose/2.svg"
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain object-right-bottom"
                />
              </div>
              <div className="relative z-10">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 block">
                  200+
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[240px]">
                  Projects Delivered Across India
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-1 relative overflow-hidden bg-zinc-900 p-8 text-white flex flex-col justify-end group shadow-sm border border-zinc-800">
              <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-35 select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src="/Why_choose/3.svg"
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain object-right-bottom"
                />
              </div>
              <div className="relative z-10">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 block">
                  15M+ sq. ft.
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[240px]">
                  Sq. Ft. of Spaces
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative h-[480px] w-full overflow-hidden bg-zinc-900 group shadow-sm border border-zinc-100">
            <Image
              src="/Why_choose/4th.svg"
              alt="Happy Homeowners"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
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
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-900 shadow-sm border border-zinc-100">
            <Image
              src="/Why_choose/1st.svg"
              alt="Value Delivered"
              fill
              unoptimized
              sizes="(max-width: 640px) 85vw, 50vw"
              className="object-cover select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
              <span className="text-2xl font-bold tracking-tight mb-1.5">
                ₹500 Cr+
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Value Delivered Across Residential & Commercial Projects
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-900 p-6 text-white flex flex-col justify-end shadow-sm border border-zinc-800">
            <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-40 select-none pointer-events-none">
              <Image
                src="/Why_choose/2.svg"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 85vw, 50vw"
                className="object-contain object-right-bottom"
              />
            </div>
            <div className="relative z-10">
              <span className="text-2xl font-bold tracking-tight mb-1.5 block">
                200+
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Projects Delivered Across India
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-900 p-6 text-white flex flex-col justify-end shadow-sm border border-zinc-800">
            <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-40 select-none pointer-events-none">
              <Image
                src="/Why_choose/3.svg"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 85vw, 50vw"
                className="object-contain object-right-bottom"
              />
            </div>
            <div className="relative z-10">
              <span className="text-2xl font-bold tracking-tight mb-1.5 block">
                15M+ sq. ft.
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sq. Ft. of Spaces
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] snap-start relative aspect-[4/3] overflow-hidden bg-zinc-900 shadow-sm border border-zinc-100">
            <Image
              src="/Why_choose/4th.svg"
              alt="Happy Homeowners"
              fill
              unoptimized
              sizes="(max-width: 640px) 85vw, 50vw"
              className="object-cover select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
              <span className="text-2xl font-bold tracking-tight mb-1.5">
                15,000+
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Built on Trust Sub-section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-16 sm:pt-20">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl sm:text-4xl font-semibold text-zinc-950 leading-[1.2] tracking-tight">
              Built on Trust <br />
              & Excellence
            </h3>
          </div>

          {/* Right Column: Two Features */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-start gap-4 group">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Built_Trust/1.svg"
                  alt="Faster Project Delivery"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-semibold text-zinc-950">
                Faster Project Delivery
              </h4>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                We streamline planning, approvals, and execution to ensure projects are delivered on time without compromising quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start gap-4 group">
              <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Built_Trust/2.svg"
                  alt="Quality You Can Trust"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-semibold text-zinc-950">
                Quality You Can Trust
              </h4>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
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
      <section className="relative min-h-screen w-full flex flex-col justify-end text-white font-sans overflow-x-hidden">
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
        <div className="relative z-10 mx-auto max-w-8xl w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 md:pb-16 flex flex-col justify-end">
          {/* Category Label */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">{"//"}</span>
            <span className="text-zinc-300 font-medium tracking-widest text-xs sm:text-sm ">
              Trusted Real Estate
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-4xl leading-[1.1] mb-8 select-none">
            Where Dream Homes <br />
            Become Reality
          </h1>

          {/* Sub-info Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full max-w-7xl">
            {/* Video Preview Card */}
            <div className="group relative flex-shrink-0 w-full sm:w-1/5 h-[100px] border border-white/20 bg-zinc-900 overflow-hidden cursor-pointer shadow-2xl transition-all duration-300">
              {/* Thumbnail Background */}
              <Image
                src="/hero-bg.png"
                alt="Video Preview Thumbnail"
                fill
                sizes="(max-width: 700px) 100vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Blurred Play Button Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-[35%] bg-black/60 backdrop-blur-[2px] flex items-center justify-center border-l border-white/10 group-hover:bg-black/40 transition-colors duration-300">
                {/* Play Icon */}
                <svg
                  className="w-10 h-10 text-white fill-white transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-md">
              Explore premium properties in prime locations with trusted guidance and seamless buying experience.
            </p>
          </div>
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
