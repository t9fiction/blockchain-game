import React from "react";
import ConnectButton from "./sub-components/ConnectButton";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-foreground shadow-md fixed w-full z-10 md:h-16">
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

          {/* Connect Wallet button on the right */}
          <div className="flex items-center">
            <div className="border border-spacing-1 border-white">
            <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;
