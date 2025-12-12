import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-main text-cream-main py-16 px-6 border-t border-orange-main/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Resources */}
        <div>
          <h4 className="font-bold text-orange-main text-lg mb-6">Resources</h4>
          <ul className="space-y-3 font-light">
            <li><Link to="/yoga/types" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Types of Yoga</Link></li>
            <li><Link to="/yoga/asana" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Yoga Asana</Link></li>
            <li><Link to="/yoga/goals" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Yoga For Specific Goals</Link></li>
          </ul>
        </div>

        {/* Yoga */}
        <div>
          <h4 className="font-bold text-orange-main text-lg mb-6">Yoga</h4>
          <ul className="space-y-3 font-light">
            <li><Link to="/about/team" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Yoga Teachers</Link></li>
            <li><Link to="/group-classes" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Group Classes</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-orange-main text-lg mb-6">Company</h4>
          <ul className="space-y-3 font-light">
            <li><Link to="/pricing" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-orange-main transition opacity-90 hover:opacity-100">About Us</Link></li>
          </ul>
        </div>

        {/* Misc */}
        <div>
          <h4 className="font-bold text-orange-main text-lg mb-6">Misc</h4>
          <ul className="space-y-3 font-light">
            <li><Link to="/privacy" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Terms of Use</Link></li>
            <li><Link to="/contact" className="hover:text-orange-main transition opacity-90 hover:opacity-100">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-orange-main transition opacity-90 hover:opacity-100">FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream-main/20 text-center opacity-60 text-sm">
        <p>© {new Date().getFullYear()} GlobalYogaSpace. All rights reserved.</p>
        <p className="mt-2 text-xs">Om Sarve Bhavantu Sukhinah</p>
      </div>
    </footer>
  );
};

export default Footer;
