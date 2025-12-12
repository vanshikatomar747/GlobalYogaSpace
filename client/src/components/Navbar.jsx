import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state

  // Pages where valid navbar should appear
  const allowedPaths = ["/", "/pricing", "/about", "/about/"];
  const isAllowedPage = allowedPaths.some(path => location.pathname === path || location.pathname.startsWith("/about"));

  // Check auth on mount and location change (to catch login updates)
  const [user, setUser] = useState(null); // Added user state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(!!token);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 100) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (isAllowedPage) {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    } else {
      setShowNavbar(true);
    }
  }, [lastScrollY, isAllowedPage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
    setIsOpen(false);
  };

  if (!isAllowedPage && location.pathname !== '/contact') return null;

  return (
    <nav className={`w-full z-50 bg-cream-main/90 backdrop-blur-sm transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0 shadow-sm`}>
      <div className="w-full px-6 py-1 flex justify-between items-center">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/Logo3_cropped.png" alt="Global Yoga Space" className="h-10 md:h-12 w-auto" />
          <span className="text-lg md:text-xl font-bold text-green-main tracking-tight">GlobalYogaSpace</span>
        </Link>

        {/* Middle Links - About & Pricing */}
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-main font-semibold text-lg" : "text-green-main hover:text-orange-main text-lg font-medium transition"}>About Us</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => isActive ? "text-orange-main font-semibold text-lg" : "text-green-main hover:text-orange-main text-lg font-medium transition"}>Pricing</NavLink>
        </div>

        {/* Right - Auth Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-green-main font-semibold text-lg hover:text-orange-main transition">
                Hi, {user?.name?.split(' ')[0] || "Yogi"}
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="text-green-main font-semibold text-lg hover:text-orange-main transition">Login/Signup</Link>
          )}

          <Link to="/tryfree" className="bg-orange-main text-white px-5 py-1.5 text-sm md:text-base rounded-full font-semibold hover:bg-orange-500 transition shadow-md hover:shadow-lg">
            {isAuthenticated ? "Try Free" : "Try Free Session"}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-3xl text-green-main" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-cream-main border-t border-orange-main/20 p-6 flex flex-col gap-6 shadow-xl absolute w-full left-0 top-full">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-green-main text-xl font-medium">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-green-main text-xl font-medium">About Us</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-green-main text-xl font-medium">Pricing</Link>
          <div className="border-t border-orange-main/20 pt-4 flex flex-col gap-4">
            {isAuthenticated ? (
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-center py-3 text-green-main border border-green-main rounded-lg font-semibold">My Profile</Link>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="text-center py-3 text-green-main border border-green-main rounded-lg font-semibold">Login / Signup</Link>
            )}
            <Link to="/tryfree" onClick={() => setIsOpen(false)} className="text-center py-2.5 text-sm bg-orange-main text-white rounded-lg font-semibold">
              {isAuthenticated ? "Try Free" : "Try Free Session"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
