import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

function Navbar() {
  const { user, blogs } = useAuth();
  const [show, setShow] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/creators", label: "Creators" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="shadow-lg shadow-gray-500 px-10 py-3 bg-black">
        <div className="flex items-center container mx-auto justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold flex gap-2">
            <img src="android-chrome-192x192.png" alt="Harbor Logo" className="h-6 w-7 mt-1" />
            <span className="text-blue-700">Harb⚓R</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="font-semibold text-red-600 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menu Button */}
          <button
            className="text-white md:hidden"
            onClick={() => setShow(!show)}
            aria-expanded={show}
            aria-label="Toggle navigation menu"
          >
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </button>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex space-x-2">
            <Link
              to="/dashboard"
              className="bg-orange-400 text-white font-semibold hover:bg-orange-700 px-3 py-1 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="bg-pink-600 text-white font-semibold hover:bg-pink-900 px-3 py-1 rounded"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {show && (
          <div className="bg-black md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-8">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setShow(false)}
                  className="font-semibold text-red-600 hover:text-white text-xl"
                >
                  {link.label}
                </Link>
              ))}

              {/* Dashboard & Login Buttons */}
              <div className="flex flex-col space-y-4 mt-6">
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="bg-orange-400 text-white font-semibold hover:bg-orange-700 px-4 py-2 rounded text-center w-40"
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-pink-600 text-white font-semibold hover:bg-pink-900 px-4 py-2 rounded text-center w-40"
                >
                  Login
                </Link>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
