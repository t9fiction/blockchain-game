import React from "react";
import ConnectButton from "./sub-components/ConnectButton";
import Link from "next/link";

const Navbar: React.FC = () => {
  const navigation = [
    "Play",
    "Ranking",
    "Guide",
    "Updates",
  ];
  return (
    <nav className="bg-transparent shadow-md fixed w-full z-10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
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

          {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-secondary uppercase duration-300 ease-in-out hover:text-white">
                    {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

          <div className="flex items-center mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
            <div className="border border-spacing-1 border-white hover:border-secondary duration-300 ease-in-out rounded-md">
            <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;
