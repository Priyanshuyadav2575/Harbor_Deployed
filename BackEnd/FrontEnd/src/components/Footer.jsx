import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="border px-6 md:px-32 py-8 bg-slate-900">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Products */}
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white">Products</h2>
            <ul className="space-y-2">
              {["Flutter", "React", "Android", "iOS"].map((product) => (
                <li key={product}>
                  <a href="#" className="text-blue-800 hover:text-red-600">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Design to Code */}
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white">Design to Code</h2>
            <ul className="space-y-2">
              {["Figma plugin", "Templates"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-800 hover:text-red-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparison */}
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white">Comparison</h2>
            <ul className="space-y-2">
              {[
                "DhiWise vs Anima",
                "DhiWise vs Appsmith",
                "DhiWise vs FlutterFlow",
                "DhiWise vs Monday Hero",
                "DhiWise vs Retool",
                "DhiWise vs Bubble",
                "DhiWise vs Figma Dev Mode",
              ].map((comparison) => (
                <li key={comparison}>
                  <a href="#" className="text-blue-800 hover:text-red-600">
                    {comparison}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-white">Company</h2>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-800 hover:text-red-600">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <div className="bg-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-32">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="android-chrome-192x192.png" alt="Logo" className="h-6 w-7" />
            <span className="text-blue-700 text-lg font-bold">Harb⚓R</span>
          </div>

          {/* Copyright */}
          <div className="text-blue-800 text-sm mb-4 md:mb-0 text-center md:text-start">
            &copy; 2024 PY PVT. LTD. All rights reserved
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 justify-center">
            <a href="#" className="text-blue-800 hover:text-white">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-800 hover:text-white">
              <BsYoutube className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-800 hover:text-white">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
