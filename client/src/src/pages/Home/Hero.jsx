import React from "react";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const [user, setUser] = React.useState(null);
  const videoRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    } else {
      setUser(null);
    }
  }, [location]);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-3.5rem)] w-full flex items-center justify-center overflow-hidden mt-12 md:mt-14">
      {/* Background Video */}
      <video
        ref={videoRef}
        key={user ? "logged-in" : "guest"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover scale-105"
      >
        <source src={user ? "/video/hero.mp4" : "/video/hero-bg.mp4"} type="video/mp4" />
      </video>

      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-[90%] md:max-w-4xl mx-auto text-white">
        {user ? (
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg animate-fade-in capitalize">
            Hi! {user.name || "Yogi"}
          </h1>
        ) : (
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Integrated Wellness and Personal Yoga classes
          </h1>
        )}
        <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 font-light drop-shadow-md">
          1-on-1 Yoga inspired training - LIVE via Zoom
        </p>
        <Link
          to={user ? "/pricing" : "/tryfree"}
          className="inline-block bg-orange-main hover:bg-orange-600 text-white text-base md:text-lg font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition transform hover:scale-105 shadow-lg"
        >
          {user ? "View Pricing" : "Try a Free Session"}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
