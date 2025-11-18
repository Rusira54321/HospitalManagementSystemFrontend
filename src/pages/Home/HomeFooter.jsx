import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const HomeFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-3xl font-bold mb-3">MediCore</h2>
          <p className="text-white/90 leading-relaxed">
            Empowering healthcare with technology.  
            MediCore simplifies hospital operations, improves patient care, and ensures efficiency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <Link to="/about" className="hover:text-white underline-offset-4 hover:underline transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white underline-offset-4 hover:underline transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white underline-offset-4 hover:underline transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-1">
            Follow Us
          </h3>
          <div className="flex items-center gap-5 text-2xl">
            <a href="#" className="hover:text-gray-200 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/30 pt-5 text-center text-white/80">
        © {new Date().getFullYear()} MediCore — All Rights Reserved.
      </div>
    </footer>
  );
};

export default HomeFooter;
