"use client";
import React, { useState, useRef, useEffect } from "react";
import ConnectButton from "./sub-components/ConnectButton";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi"; // Import a hamburger icon from a library like react-icons

const Navbar: React.FC = () => {
  const navigation = ["Play", "Ranking", "Guide", "Updates"];

  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Add event listener on mount and cleanup on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-transparent fixed w-full z-10 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Image
              className="h-20 w-auto"
              src="/logo1.png"
              alt="Logo"
              width={400}
              height={160}
            />
          </div>

          {/* Menu for larger screens */}
          <div
            className={`hidden lg:flex lg:items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href="/"
                    className="inline-block px-4 py-2 text-lg font-normal text-secondary no-underline rounded-md uppercase duration-300 ease-in-out hover:text-primary"
                  >
                    {menu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect button */}
          <div className="flex items-center mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
            <div className="border border-spacing-1 border-secondary hover:border-primary duration-300 ease-in-out rounded-md">
              <ConnectButton />
            </div>
          </div>

          {/* Menu toggle icon for mobile */}
          <div className="flex lg:hidden items-center justify-center">
            <button
              onClick={toggleMenu}
              className="text-secondary focus:outline-none"
            >
              <FiMenu className="h-12 w-12" />
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="flex absolute lg:hidden top-24 right-10" ref={menuRef}>
              <ul className="flex flex-col items-center shadow-md shadow-primary rounded-lg p-4">
                {navigation.map((menu, index) => (
                  <li className="my-2" key={index}>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-lg font-normal no-underline rounded-md text-secondary uppercase duration-300 ease-in-out hover:text-primary"
                    >
                      {menu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
