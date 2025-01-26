import React from "react";
import ConnectButton from "./sub-components/ConnectButton";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-foreground shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            {/* <img
              className="h-8 w-auto"
              src="/logo.png" 
              alt="Logo"
            /> */}
            <h3 className="text-secondary cursor-pointer text-2xl font-bold ">
              <Link href={'/'}>LOGO</Link>
            </h3>
          </div>

          {/* Menu buttons in the center */}
          <div className="hidden md:flex md:items-center md:space-x-6 flex-grow justify-center">
            <a
              href="#"
              className="text-secondary hover:text-gray-900 px-3 py-2 duration-300 ease-in-out uppercase rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-secondary hover:text-gray-900 px-3 py-2 duration-300 ease-in-out uppercase rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-secondary hover:text-gray-900 px-3 py-2 duration-300 ease-in-out uppercase rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* Connect Wallet button on the right */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Mobile menu (responsive) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="text-secondary hover:text-gray-900 block px-3 py-2 duration-300 ease-in-out rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-secondary hover:text-gray-900 block px-3 py-2 duration-300 ease-in-out rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-secondary hover:text-gray-900 block px-3 py-2 duration-300 ease-in-out rounded-md text-base font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
