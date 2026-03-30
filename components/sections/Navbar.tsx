"use client";

import Link from "next/link";
import { useState } from "react";
import { BadgeIndianRupee, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },

    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
  ];


  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-(--color-border)">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center h-8">
          <img
            src="/images/gallery/logo.png"
            alt="Fakirdiwan Samaj Logo"
            className=" w-[42%] "
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-(--color-text) font-medium">
          {/* Main Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-(--color-accent) transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Pages Dropdown */}
          {/* <div className="relative group">
            <button className="flex items-center gap-1 hover:text-(--color-accent) transition">
              Pages
              <ChevronDown size={16} />
            </button>

            <div className="absolute left-0 mt-3 w-52 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="flex flex-col py-2 text-sm">
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          <Link
            href="/contact"
            className="hover:text-(--color-accent) transition"
          >
            Contact Us
          </Link>

          {/* Donate Button */}
          <Link href="/donate">
            <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
              <BadgeIndianRupee /> Donate
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-(--color-text)"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-(--color-surface) border-t border-(--color-border)">
          <div className="flex flex-col gap-4 p-6 text-(--color-text) font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}

            {/* Mobile Pages Dropdown */}
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex items-center justify-between"
            >
              Pages
              <ChevronDown
                size={18}
                className={`transition-transform ${pagesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* {pagesOpen && (
              <div className="flex flex-col ml-4 gap-2 text-sm">
                {pages.map((page) => (
                  <Link key={page.href} href={page.href}>
                    {page.name}
                  </Link>
                ))}
              </div>
            )} */}

            <Link href="/contact">Contact Us</Link>

            <Link
              href="/donate"
              className="bg-(--color-accent) text-white text-center py-2 rounded-full mt-4"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
