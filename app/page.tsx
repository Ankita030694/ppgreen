'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

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
      {count}
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
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
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
                  <AnimatedCounter value={15} suffix="+" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Years Experience
                </span>
              </div>
              
              {/* Stat 2 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
                  <AnimatedCounter value={120} suffix="+" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Projects Delivered
                </span>
              </div>
              
              {/* Stat 3 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 tracking-tight">
                  <AnimatedCounter value={98} suffix="%" />
                </span>
                <span className="text-zinc-800 font-semibold text-xs sm:text-sm mt-2 leading-tight">
                  Customer Satisfaction
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
  description: string;
}

const offersList: OfferItem[] = [
  {
    id: 1,
    image: '/What_we_offer/1.svg',
    category: 'Residential',
    title: 'Luxury Residences',
    description: 'Bespoke apartments and premium flats designed for modern, high-end living.',
  },
  {
    id: 2,
    image: '/What_we_offer/2.svg',
    category: 'Commercial',
    title: 'Modern Retail & Offices',
    description: 'State-of-the-art commercial hubs and corporate spaces in prime business locations.',
  },
  {
    id: 3,
    image: '/What_we_offer/3.svg',
    category: 'Townships',
    title: 'Integrated Townships',
    description: 'Self-sustaining communities with elite infrastructure, schools, and parks.',
  },
  {
    id: 4,
    image: '/What_we_offer/4.svg',
    category: 'Villas',
    title: 'Exclusive Villas',
    description: 'Private luxury villas offering ultimate exclusivity, private yards, and premium design.',
  },
  {
    id: 5,
    image: '/What_we_offer/5.svg',
    category: 'Plots',
    title: 'Strategic Plots',
    description: 'Premium residential and commercial plots situated in rapid growth corridors.',
  },
];

function Offers() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
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
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {offersList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  priority={item.id <= 3}
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
                  <p className="text-xs text-zinc-300 leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-in-out">
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


// 4. Our Services Section Component

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'Property & Construction',
    description: 'We manage every phase of development, ensuring quality construction, timely execution, and attention to detail from foundation to completion.',
  },
  {
    number: '02',
    title: 'Architectural Planning & Design',
    description: 'Our team creates innovative layouts and modern designs that maximize space, functionality, aesthetics, and long term value.',
  },
  {
    number: '03',
    title: 'Project Management & Delivery',
    description: 'We coordinate timelines, resources, and stakeholders to ensure smooth project execution and successful delivery of every development.',
  },
  {
    number: '04',
    title: 'Sales, Leasing & Investment Advisory',
    description: 'We help buyers and investors identify the right opportunities through expert guidance, market insights, and end to end support.',
  },
];

function Services() {
  return (
    <section id="services" className="relative w-full bg-zinc-950 text-white py-16 sm:py-24 overflow-hidden border-t border-zinc-900">
      {/* Background Image Pattern */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40">
        <Image
          src="/above_black_bg.svg"
          alt="Dark Pattern Background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20">
          {/* Left Side Tagline */}
          <div className="lg:col-span-4 flex items-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
            <span className="text-white font-regular tracking-widest text-xs sm:text-sm ">
              Our Services
            </span>
          </div>

          {/* Right Side Headline */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.25] tracking-tight max-w-4xl">
              Comprehensive real estate solutions from planning to project delivery.
            </h2>
          </div>
        </div>

        {/* Services Scroll Slider */}
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-4 px-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {servicesList.map((service) => (
            <div
              key={service.number}
              className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start flex flex-col group"
            >
              {/* Number */}
              <span className="text-sm font-semibold tracking-wider text-zinc-400 group-hover:text-orange-400 transition-colors duration-300 mb-2">
                {service.number}
              </span>
              
              {/* Horizontal Line */}
              <div className="w-full border-t border-zinc-800/80 mb-6" />

              {/* Custom Stylized Line Art Building Icon */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-zinc-300 group-hover:text-orange-500 group-hover:scale-105 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V10l4-3v14M10 21V5l4-3v19M14 21v-8l4-3v11" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-md font-medium tracking-tight text-white mb-4 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {service.description}
              </p>
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
    category: 'Industrial',
    title: 'Industrial Developments',
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
    category: 'Residential',
    title: 'Residential Communities',
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
              <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
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
          className="flex lg:hidden gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6"
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
// 6. Main Page Component
// ==========================================
export default function Home() {
  return (
    <main className="w-full bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col justify-end text-white font-sans overflow-x-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/Hero Image.svg"
            alt="Luxury Villa Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent h-48" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-8xl w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 md:pb-16 flex flex-col justify-end">
          {/* Category Label */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
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

      {/* Our Services Section */}
      <Services />

      {/* Our Expertise Section */}
      <Expertise />
    </main>
  );
}
