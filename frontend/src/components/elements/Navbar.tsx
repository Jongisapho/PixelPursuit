import { useState } from "react";
import { Menu, X } from "lucide-react"; // Add lucide-react icons for hamburger/close
import { Container } from "../shared/Container";
import logo from "../../assets/icon.svg";
import { NavItem } from "../shared/NavItem";
import { ModeToogle } from "../shared/mode-toggle";
import { AuthModal } from "./AuthModal";

const navItems = [
  { href: "#", text: "Home" },
  { href: "#services", text: "Services" },
  { href: "#about-us", text: "About us" },
  { href: "#features", text: "Features" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 py-6">
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img src={logo} alt="PixelPursuit Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold">PixelPursuit</span>
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-8 text-lg">
              {navItems.map((item, key) => (
                <NavItem href={item.href} text={item.text} key={key} />
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-6">
              {/* Change to button */}
              <button
                onClick={openAuthModal}
                className="min-w-max bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-200 active:scale-95"
              >
                Get Started
              </button>
              <ModeToogle />
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>

          {/* Mobile menu overlay & sidebar unchanged */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          )}

          <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="flex flex-col p-8 mt-20 gap-6">
              <ul className="flex flex-col gap-6 text-xl">
                {navItems.map((item, key) => (
                  <NavItem
                    href={item.href}
                    text={item.text}
                    key={key}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </ul>

              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Get Started button */}
                <button onClick={openAuthModal} className="min-w-max bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Get Started
                </button>
                <div className="flex justify-center">
                  <ModeToogle />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Render Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};