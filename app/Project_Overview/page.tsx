'use client';

import { useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CTA from '../components/cta';
import Footer from '../components/footer';

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  status: string;
  type: string;
  location: string;
  builtUpArea: string;
  image: string;
  client?: string;
  completed?: string;
  contributors?: string;
  overview: string[];
  featuresTitle?: string;
  features?: string[];
}

export const projectsList: ProjectDetail[] = [
  {
    id: 1,
    title: 'PP City Centre',
    category: 'Commercial',
    status: 'Delivered',
    type: 'Commercial',
    location: 'Pitampura, Delhi',
    builtUpArea: '118,854 Sq. Ft.',
    image: '/PP City Centre/pic-3.jpg',
    overview: [
      'An inventive design, interactive setting, distinctive interiors, high visibility and flawless construction amalgamate so well that what emerges is an extraordinary example of edificial splendor. The intimate interaction of the inside and the outside spaces has synthesised into a sophisticated stylish setting. Unhindered movement of visitors and effective space management are the unique features of the project.'
    ],
    featuresTitle: 'PP City Centre Features',
    features: [
      'ELOQUENT ARCHITECTURAL STATEMENT',
      'AN INVITING, 5 STAR FEEL TO THE WHOLE PLACE',
      'GRAND ENTRY PLAZA TO ADD TO THE VERVE AND VIVACITY OF THE PLACE',
      'ATTRACTIVE FACADE AND CLEAR SIGNAGES',
      'TACTICAL LOCATION OF SHOPS AND STORES',
      'AMPLE PARKING SPACE',
      '24 X 7 SECURITY ARRANGEMENT',
      'FOUR SIDE CORNER PLOT WITH WIDE FRONTAGE AND HAVING A GRAND PIAZZA'
    ]
  },
  {
    id: 2,
    title: 'West End Convention Mall',
    category: 'Commercial',
    status: 'Delivered',
    type: 'Commercial',
    location: 'Janakpuri, Delhi',
    builtUpArea: '197,892 Sq. Ft.',
    image: '/West End Convention Mall/west3-1.jpg',
    overview: [
      'The First and Second Floor provide banquet and conference facilities. There were strong reasons behind opting for banquet services. In the midst of a glowing commercial on all sides, quality banquet services are still too few and far between.',
      'Making sure of the locational advantage, we designed the banquet halls in compassionate, relaxing and soothing style in the back drop of joyous colors. They also provide an array of deluxe facilities and supports, covering virtually any occasion from a marriage Party to a Corporate Meeting.',
      'Believing in the axiom – variety is the spice of life, this service can augur well for any occasion where a few heads gather together. An ideal destination for hosting kitty parties, birthday’s parties, social get-togethers, marriage parties, business conferences, dealers meet etc.'
    ],
    featuresTitle: 'Key Features & Facilities',
    features: [
      'Ample Parking in Basement level',
      'Glass Capsule Lifts',
      '100% Power Backup',
      'Centrally Air Conditioned Complex',
      'High Frontage for Showrooms',
      'Located on prime Location surrounded by Five Star Hotel, Cineplex, Shopping Mall & Janak Place, Janakpuri District Center',
      'Optimised Space Management',
      'Prime Location in up market area surrounded by Posh Locality',
      'Permanent Exterior Finish with Glass Cladding',
      'Earthquake Resistant R.C.C. Framed Structure',
      'State of Art Fire Fighting Arrangement which includes intelligent Addressable Fire Alarm System',
      'Designed by Renowned Architect, Mr. Gian P. Mathur'
    ]
  },
  {
    id: 3,
    title: 'PP Trade Centre',
    category: 'Commercial',
    status: 'Delivered',
    type: 'Commercial',
    location: 'Netaji Subhash Place',
    builtUpArea: '241,920 Sq. Ft.',
    image: '/PP Trade Centre/pp_trade_centre.jpg',
    overview: [
      'The ground and First Floors of the PP Trade Centre offer an open and vibrant retail arena with large floor plates for bigger showrooms, connected by wide corridors and elevators. Arranged around a beautifully landscaped courtyard, each showroom has excellent visibility from the courtyard or from exterior. This fully integrated shopping centre will include every modern facility and would make your every trip to it fully enjoyable. Adequate signages, wide corridors, sufficient car parking bays, it is just our way to ensure that shopping spree of customers is truly stress and hassle free.'
    ],
    featuresTitle: 'Ideal Destination For',
    features: [
      'Departmental Stores',
      'Branded Retail Outlets',
      'Fashion Boutiques',
      'Gift Gallery',
      'Home Appliances',
      'Food Court',
      'Bakery Point',
      'Specialty Restaurant',
      'Coffee Shop',
      'Cyber Cafes',
      'Gift Shops',
      'Bank ATMs etc.'
    ]
  },
  {
    id: 4,
    title: 'Mohali Walk',
    category: 'Commercial',
    status: 'Delivered',
    type: 'Commercial',
    location: 'Mohali, Punjab',
    builtUpArea: '296,991 Sq. Ft.',
    image: '/mohali Walk/33-scaled.jpg',
    overview: [
      'Welcome to Mohali Walk, your destination for the ultimate shopping and entertainment experience in Mohali. We are thrilled to be your #1 Biggest Anchor Mall, proudly presented by PP Buildwell—a name synonymous with excellence in retail and commercial development, and has completed its 15 years of magnificent performance. During these glorious years, the group has been associated with some of the most prestigious residential and commercial real estate development projects in the NCR. The group has pioneered the development of high rise residential projects in Delhi, with Delhi\'s first 20 storeyed group housing in Rohini.',
      'Mohali Walk, designed by the acclaimed Bentel Associates and expertly managed by PPZ, represents a new era in shopping and leisure. Our vision is clear: to redefine shopping as an exciting and immersive experience. At Mohali Walk, we bring brands to life, making every visit memorable.',
      'With an impressive lineup of top brands including PVR, DMart, Shoppers Stop, Haldirams, and many more, we offer a diverse retail experience under one roof. From the latest fashion trends to gourmet dining and entertainment, we have it all.',
      'Additionally, for those looking for an excellent investment opportunity, Mohali Walk stands as a prime choice. Its strategic location and rapid growth potential make it an attractive option for investors seeking long-term value.',
      'As we embark on this journey, we are guided by our core values of innovation, customer-centricity, care, and excellence. Mohali Walk is more than a mall it\'s a vibrant community where families create lasting memories, friends gather, shoppers find joy, and investors secure a promising future.'
    ],
    featuresTitle: 'Project Highlights & Investment Advantages',
    features: [
      'Prime 2-acre site with four-side open access.',
      'Advanced construction nearing completion.',
      '140+ reputable brand associations.',
      'Contracts with top retail and food court brands.',
      '12% assured return pre-possession.',
      '9-year leases with minimum income guarantees.'
    ]
  },
  {
    id: 5,
    title: 'AP Wonder',
    category: 'Residential',
    status: 'Delivered',
    type: 'Residential',
    location: 'Rithala, Rohini',
    builtUpArea: '256,905 Sq. Ft.',
    image: '/AP Wonders/Copy of ChatGPT Image Mar 10, 2026 at 01_33_20 AM.png',
    overview: [
      'For the able, qualified and learned, at the end of hectic day, they would prefer the wonder of sacrosanct and tranquil home. Far from the noise, traffic and swirl of the metropolis. AP-Wonders is like an exotic ecosystem with charmed surroundings and re-assuring tenderness of a sanctuary placed in a scene-stealing backdrop.',
      'AP Wonders is at once a marvel of home along with lush expanse of enchanting green coupled with the presence of all cosmopolitan visages. It is architecturally distinct amidst the spectacular colors of nature’s bounty.'
    ],
    featuresTitle: 'AP Wonder Features',
    features: [
      'Well Designed complex with beautiful Landscape',
      'Construction vs Open area – 20:80',
      'Structure Designed for highest Seismic consideration',
      'Drinking water Treatment facility by RO System',
      'Gas Supply Through gas pipe line',
      'Rain water harvesting arrangement for ecological balance',
      'Adequate Basement Parking',
      'Adequate Power, cable TV & Telephone Points in all rooms'
    ]
  },
  {
    id: 6,
    title: 'PP Green City',
    category: 'Residential',
    status: 'Delivered',
    type: 'Residential',
    location: 'Sonipat, Haryana',
    builtUpArea: '12 acre',
    image: '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_30_21 AM.png',
    overview: [
      'PP Green City is a thoughtfully planned residential township in Sector 27, Sonipat, offering residential plots for those looking to create customised homes in a well-planned environment. Strategically connected to NH-44 (GT Road), the development benefits from growing infrastructure and increasing interest in the Sonipat region. With spacious layouts, internal roads, green spaces and a peaceful residential setting, PP Green City presents an attractive opportunity for both end users and long-term investors seeking a well-connected address within the Delhi-NCR region.',
      'The success of PP Green City led to the vision for PP Green City 2, built around a simple yet meaningful idea: giving people the opportunity to own land and create a space that is truly their own. This vision took shape as a premium residential plotted development, offering the freedom to build, personalise and shape a home for the future.'
    ],
    featuresTitle: 'PP Green City Features',
    features: [
      'Close to NH-44 (GT Karnal Road).',
      'Easy access to Delhi.',
      'Dedicated amenities and children’s play areas within the township.',
      'Landscaped green belts and open spaces.',
      'Gated community with 24×7 security.',
      'Wide internal roads for smooth connectivity.',
      'Well-connected to central Sonipat.',
      'Growing public transport and commercial activity in the vicinity.'
    ]
  }
];

function ProjectOverviewContent() {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get('title');

  // Match selected project from query param or fallback to first project
  const currentProject = projectsList.find(
    (p) =>
      p.title.toLowerCase() === titleParam?.toLowerCase() ||
      (titleParam && p.title.toLowerCase().replace(/\s+/g, '') === titleParam.toLowerCase().replace(/\s+/g, '')) ||
      (titleParam?.toLowerCase().startsWith('pp green city') && p.title.toLowerCase().startsWith('pp green city')) ||
      (titleParam?.toLowerCase().startsWith('west end') && p.title.toLowerCase().startsWith('west end'))
  ) || projectsList[0];

  const otherProjects = projectsList.filter((p) => p.id !== currentProject.id);

  const sliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = sliderRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = sliderRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = sliderRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = sliderRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-1">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] sm:h-[80vh] md:h-[85vh] bg-black overflow-hidden flex items-end">
        {/* Background Project Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={currentProject.image}
            alt={currentProject.title}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover select-none pointer-events-none"
            priority
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-10 flex flex-col items-start">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="border border-white/40 text-white bg-white/15 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
              {currentProject.category}
            </span>
            <span className="border border-white/40 text-white bg-white/15 backdrop-blur-xs px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
              {currentProject.location}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[#F9CC94] font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
            {currentProject.title}
          </h1>
        </div>
      </section>

      {/* Project Details & Overview Content Section */}
      <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-14">
          
          {/* Details Block */}
          <div className="flex flex-col">
            <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-6">
              {"Details"}
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              {/* Project */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-48 sm:w-56 shrink-0">{"Project:"}</span>
                <span className="text-[#0C433C] font-normal">{currentProject.title}</span>
              </div>
              {/* Status */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-48 sm:w-56 shrink-0">{"Status:"}</span>
                <span className="text-[#0C433C] font-normal">{currentProject.status}</span>
              </div>
              {/* Type */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-48 sm:w-56 shrink-0">{"Type:"}</span>
                <span className="text-[#0C433C] font-normal">{currentProject.type}</span>
              </div>
              {/* Location */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-48 sm:w-56 shrink-0">{"Location:"}</span>
                <span className="text-[#0C433C] font-normal">{currentProject.location}</span>
              </div>
              {/* Approx. Built-Up Area */}
              <div className="flex items-start">
                <span className="text-zinc-400 font-medium w-48 sm:w-56 shrink-0">{"Approx. Built-Up Area:"}</span>
                <span className="text-[#0C433C] font-normal">{currentProject.builtUpArea}</span>
              </div>
            </div>
          </div>

          {/* Overview Block */}
          <div className="flex flex-col">
            <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-6">
              {"Overview"}
            </h2>
            <div className="flex flex-col gap-5 text-[#000000]/60 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              {currentProject.overview.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Features Block */}
          {currentProject.features && currentProject.features.length > 0 && (
            <div className="flex flex-col pt-4">
              <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl mb-6">
                {currentProject.featuresTitle || "Key Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProject.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-[#F2F7F6] p-4 border-l-4 border-[#0C433C] transition-all hover:translate-x-1"
                  >
                    <span className="text-[#0C433C] font-bold text-base mt-0.5">•</span>
                    <span className="text-[#000000] text-sm sm:text-base font-medium leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PP Green City: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'pp green city' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/PP Green City main/Copy of ChatGPT Image Mar 9, 2026 at 10_58_05 PM.png',
                    '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_25_29 AM.png',
                    '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_27_13 AM.png',
                    '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_30_21 AM.png',
                    '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_42_49 AM.png',
                    '/PP Green City main/Copy of ChatGPT Image Mar 10, 2026 at 01_44_00 AM.png'
                  ].map((imgSrc, idx) => {
                    const label = `Project Render ${idx + 1}`;

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PP Trade Centre: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'pp trade centre' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/Pp green city/pic-3.jpg',
                    '/Pp green city/pic-9.jpg',
                    '/Pp green city/pic-13.jpg',
                    '/Pp green city/pic-14.jpg',
                    '/Pp green city/pic-16.jpg',
                    '/Pp green city/pic-17.jpg'
                  ].map((imgSrc, idx) => {
                    const label = `Gallery Image ${idx + 1}`;

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* West End Convention Mall: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'west end convention mall' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery & Plans"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/West End Convention Mall/west3-1.jpg',
                    '/West End Convention Mall/ground_floor.jpg',
                    '/West End Convention Mall/first_second_floor_plan.jpg',
                    '/West End Convention Mall/third_floor.jpg',
                    '/West End Convention Mall/third_floor_plan.jpg'
                  ].map((imgSrc, idx) => {
                    const filename = imgSrc.split('/').pop() || '';
                    let label = 'Gallery Image';
                    if (filename.includes('ground_floor')) label = 'Ground Floor Plan';
                    else if (filename.includes('first_second')) label = 'First & Second Floor Plan';
                    else if (filename.includes('third_floor_plan')) label = 'Third Floor Plan';
                    else if (filename.includes('third_floor')) label = 'Third Floor Plan View';
                    else if (filename.includes('west3')) label = 'Exterior View';

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Mohali Walk: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'mohali walk' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery & Plans"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/mohali Walk/33-scaled.jpg',
                    '/mohali Walk/21.jpg',
                    '/mohali Walk/22-scaled.jpg',
                    '/mohali Walk/27-scaled.jpg',
                    '/mohali Walk/30-scaled.jpg',
                    '/mohali Walk/32-scaled.jpg',
                    '/mohali Walk/Food-Court--scaled.jpg',
                    '/mohali Walk/ground_floor.jpg',
                    '/mohali Walk/first_second_floor_plan.jpg',
                    '/mohali Walk/third_floor_plan.jpg'
                  ].map((imgSrc, idx) => {
                    const filename = imgSrc.split('/').pop() || '';
                    let label = 'Gallery Image';
                    if (filename.includes('ground_floor')) label = 'Ground Floor Plan';
                    else if (filename.includes('first_second')) label = 'First & Second Floor Plan';
                    else if (filename.includes('third_floor_plan')) label = 'Third Floor Plan';
                    else if (filename.includes('Food-Court')) label = 'Food Court Rendering';
                    else if (filename.includes('33')) label = 'Exterior View';
                    else if (filename.includes('21') || filename.includes('22') || filename.includes('27') || filename.includes('30') || filename.includes('32')) {
                      label = `Project Rendering ${filename.split('-')[0].replace('.jpg', '')}`;
                    }

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PP City Centre: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'pp city centre' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery & Plans"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/PP City Centre/pic-3.jpg',
                    '/PP City Centre/pic-9.jpg',
                    '/PP City Centre/pic-13.jpg',
                    '/PP City Centre/pic-14.jpg',
                    '/PP City Centre/pic-16.jpg',
                    '/PP City Centre/pic-17.jpg',
                    '/PP City Centre/location-big.jpg',
                    '/PP City Centre/floor_big-1.jpg'
                  ].map((imgSrc, idx) => {
                    const filename = imgSrc.split('/').pop() || '';
                    let label = 'Gallery Image';
                    if (filename.includes('location-big')) label = 'Location Map';
                    else if (filename.includes('floor_big')) label = 'Floor Plan';
                    else if (filename.startsWith('pic')) label = `Project Render ${filename.replace('pic-', '').replace('.jpg', '')}`;

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* AP Wonder: Gallery Carousel */}
          {currentProject.title.toLowerCase() === 'ap wonder' && (
            <div className="flex flex-col gap-16 border-t border-zinc-100 pt-12">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#0C433C] font-semibold text-2xl sm:text-3xl">
                    {"Project Gallery & Plans"}
                  </h2>
                  {/* Slider Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (gallerySliderRef.current) {
                          gallerySliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 border border-zinc-200 hover:bg-[#F2F7F6] text-zinc-700 transition-colors duration-300 rounded-full cursor-pointer focus:outline-none"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={gallerySliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none pb-4 select-none snap-x snap-mandatory"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {[
                    '/AP Wonders/Copy of ChatGPT Image Mar 10, 2026 at 01_33_20 AM.png',
                    '/AP Wonders/Copy of ChatGPT Image Mar 10, 2026 at 01_31_40 AM.png',
                    '/AP Wonders/Copy of not use ChatGPT Image Mar 10, 2026 at 01_35_33 AM.png',
                    '/AP Wonders/ap_wonderbig.jpg',
                    '/AP Wonders/ap_wonderbig1.jpg',
                    '/AP Wonders/ap_wonderbig4-1.jpg'
                  ].map((imgSrc, idx) => {
                    const filename = imgSrc.split('/').pop() || '';
                    let label = 'Gallery Image';
                    if (filename.includes('01_33_20')) label = 'Exterior Rendering 1';
                    else if (filename.includes('01_31_40')) label = 'Exterior Rendering 2';
                    else if (filename.includes('01_35_33')) label = 'Exterior Rendering 3';
                    else if (filename.includes('ap_wonderbig.jpg')) label = 'Site Layout Plan';
                    else if (filename.includes('ap_wonderbig1')) label = 'Unit Layout Plan 1';
                    else if (filename.includes('ap_wonderbig4-1')) label = 'Unit Layout Plan 2';

                    return (
                      <div
                        key={idx}
                        className="flex-none w-[80vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] relative bg-zinc-50 snap-start border border-zinc-200 rounded-lg overflow-hidden shadow-sm group"
                      >
                        <Image
                          src={imgSrc}
                          alt={label}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end z-10">
                          <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* More Projects Section */}
      <section className="relative w-full bg-white pb-24 sm:pb-32 border-t border-zinc-100 pt-16 sm:pt-12 md:pt-12">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Centered Heading */}
          <h2 className="text-[#0C433C] font-semibold text-3xl sm:text-4xl md:text-5xl text-center mb-16 select-none">
            {"More projects"}
          </h2>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            className="flex gap-6 overflow-x-auto scrollbar-none pb-4 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {otherProjects.map((project) => (
              <Link
                key={project.id}
                href={`/Project_Overview?title=${encodeURIComponent(project.title)}`}
                className="group relative flex-none w-[85vw] sm:w-[480px] lg:w-[560px] aspect-[16/10] overflow-hidden bg-zinc-100 block"
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start justify-end z-10">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 uppercase mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight transition-transform duration-300 group-hover:-translate-y-1">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
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

export default function ProjectOverviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProjectOverviewContent />
    </Suspense>
  );
}
