import React from "react";
import { Link, useLocation } from "react-router-dom";

// Placeholder images
const images = [
  { src: "/images/gallery/gall1.png", title: " The Light Within" },
  { src: "/images/gallery/gall4.png", title: "The Serpent Power" },
  { src: "/images/gallery/gall2.png", title: "Chakras" },
  { src: "/images/gallery/gall5.png", title: "The Power of Sacred Sound" },
  // Center slot is reserved for CTA
  { src: "/images/gallery/gall7.png", title: "Pranayama" },
  { src: "/images/gallery/gall9.png", title: "Purify to Transform" },
  { src: "/images/gallery/gall8.png", title: "Restorative Consciousness" },
  { src: "/images/gallery/gall3.png", title: "The Unseen Force" },
];

const GalleryGrid = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const location = useLocation(); // Need to import useLocation if not available, wait, it is not imported.

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <section className="py-12 md:py-24 bg-cream-lighter">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        {/* Changed grid-cols to 3 universally */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 relative">
          {/* First 4 Images */}
          {images.slice(0, 4).map((item, index) => (
            <GalleryItem key={index} item={item} />
          ))}

          {/* Center CTA Card */}
          <div className="aspect-square rounded-xl md:rounded-2xl lg:rounded-3xl bg-green-main text-white flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 text-center shadow-xl transform transition-transform duration-500 hover:scale-105 relative overflow-hidden group">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

            {/* Scaled Typography for Mobile -> Tablet -> Desktop */}
            <h3 className="text-[10px] sm:text-base md:text-2xl lg:text-4xl font-serif font-bold mb-1 md:mb-3 lg:mb-4 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 leading-tight">
              Join Our<br />Community
            </h3>

            {/* Hidden description on very small screens, shown on sm+ */}
            <p className="hidden sm:block text-white/80 mb-2 md:mb-4 lg:mb-8 max-w-xs text-xs md:text-sm lg:text-base leading-relaxed relative z-10">
              Discover your path to wellness with our expert-led yoga sessions.
            </p>

            <Link
              to={isAuthenticated ? "/pricing" : "/auth"}
              className="relative z-10 bg-orange-main hover:bg-orange-600 text-white font-semibold py-1 px-2 md:py-2 md:px-6 lg:py-3 lg:px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:px-3 md:hover:px-8 lg:hover:px-10 text-[8px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap mt-1 md:mt-0"
            >
              {isAuthenticated ? "View Plans" : "Get Started"}
            </Link>
          </div>

          {/* Last 4 Images */}
          {images.slice(4).map((item, index) => (
            <GalleryItem key={index + 4} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ item }) => (
  <div className="group relative aspect-square rounded-xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-900">
    <img
      src={item.src}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

    {/* Text Content - Centered & Minimalist */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-center w-full">
        {/* Scaled Text title */}
        <h3 className="text-white text-[10px] sm:text-base md:text-2xl lg:text-3xl font-serif font-medium tracking-wider text-center drop-shadow-lg leading-tight">
          {item.title}
        </h3>
        <div className="h-px w-0 bg-white mt-1 md:mt-4 group-hover:w-8 md:group-hover:w-24 transition-all duration-700 ease-out delay-100" />
      </div>
    </div>
  </div>
);

export default GalleryGrid;
