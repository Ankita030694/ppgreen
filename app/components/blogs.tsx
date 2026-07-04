import Image from 'next/image';

interface BlogItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const blogsList: BlogItem[] = [
  {
    id: 1,
    image: '/blogs/1.svg',
    title: 'MODERN LIVING: THE FUTURE OF URBAN REAL ESTATE',
    description: 'Every great development begins with a vision. Discover how thoughtful planning, sustainable construction, and modern design come together to create communities built for the future.',
  },
  {
    id: 2,
    image: '/blogs/1.svg',
    title: 'SMART INVESTMENT STRATEGIES IN REAL ESTATE',
    description: 'Learn how choosing the right location, understanding market trends, and investing in quality developments can help maximize long term returns and financial growth.',
  },
];

export default function Blogs() {
  const [blog1, blog2] = blogsList;

  return (
    <section id="blogs" className="relative w-full bg-white text-black py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-12 sm:mb-16">
          {/* Tagline */}
          <div className="flex items-center gap-2.5">
            <span className="text-orange-500 font-bold text-lg sm:text-xl tracking-wider select-none">//</span>
            <span className="text-black/60 font-regular tracking-widest text-xs sm:text-sm uppercase">
              Blog posts
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 leading-[1.15] tracking-tight">
            Blog articles
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Article 1) */}
          <div className="flex flex-col w-full group">
            {/* Image Container (Square) */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 mb-6 shadow-sm border border-zinc-100 transition-all duration-300">
              <Image
                src={blog1.image}
                alt={blog1.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
              />
            </div>
            {/* Text details */}
            <span className="text-orange-500 font-bold text-base sm:text-lg tracking-wider uppercase mb-3 block">
              {blog1.title}
            </span>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {blog1.description}
            </p>
          </div>

          {/* Right Column (Article 2 & CTA) */}
          <div className="flex flex-col w-full h-full justify-between group">
            <div className="flex flex-col w-full">
              {/* Image Container (Landscape) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 mb-6 shadow-sm border border-zinc-100 transition-all duration-300">
                <Image
                  src={blog2.image}
                  alt={blog2.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />
              </div>
              {/* Text details */}
              <span className="text-orange-500 font-bold text-base sm:text-lg tracking-wider uppercase mb-3 block">
                {blog2.title}
              </span>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                {blog2.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-end mt-8 sm:mt-12 md:mt-16">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-8 py-4 uppercase tracking-wider transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer">
                Explore More
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
