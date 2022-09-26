import { NAV_LINKS } from "config/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";

const Header = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };
  return (
    <header className="fixed shadow top-0 h-16 left-0 right-0 w-full border-b-2 border-b-secondary/90 bg-white z-[222222]">
      <nav className="h-full flex max-w-5xl px-5 py-3 xl:px-0 w-full justify-between items-center mx-auto">
        <Link href="https://techathonian.com/">
          <a className="relative w-28 h-6">
            <Image src="/logo.png" layout="fill" />
          </a>
        </Link>
        <ul
          className={`flex gap-5 fixed bg-primary/90 text-white backdrop-blur-sm flex-col right-0 top-0 h-full w-[50%] sm:w-[40%] shadow-md p-8 py-10 ${
            navOpen ? "clip-100" : "clip-0 md:clip-100"
          } duration-500 md:relative md:bg-transparent md:text-primary-dark md:flex-row md:p-0 md:items-center`}
        >
          {NAV_LINKS.map((link) => (
            <li className="w-full group" key={link.text}>
              <Link href={link.url}>
                <a className="block h-full group-hover:pl-2 md:group-hover:pl-0 group-hover:text-secondary md:group-hover:text-primary md:group-hover:underline duration-500">
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
          <li
            role="button"
            className="absolute top-3 right-5 text-white cursor-pointer md:hidden"
            onClick={toggleNav}
          >
            <BiX size={28} />
          </li>
        </ul>
        <button
          onClick={toggleNav}
          role="toggle"
          type="button"
          className="cursor-pointer h-10 w-10 grid place-items-center text-primary md:hidden"
        >
          <BiMenuAltRight size={25} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
