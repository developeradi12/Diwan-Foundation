"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Send, Twitter, Youtube } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
  ]

  const contactInfo = {
    address: {
      street: "601, 6th floor, Al-wajee residency, lallu raiji no vando",
      city: "mirzapur",
      state: "ahmedabad",
      zip: "380001",
      country: "India",
    },
    phone: "+91 87588 19249",
    email: "info@allgujaratmuslimfakirdiwansamaj.org",
    officeHours: "Mon – Fri, 9:00 AM – 6:00 PM IST",
  }

  return (
    <footer
      className="py-16 md:py-16  text-white relative"
      style={{
        backgroundImage: `
        linear-gradient(to top, rgba(7,26,43,1) 40%, rgba(7,26,43,0.85)),
        url('/images/helping_hand.png')
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Logo + Contact */}
          <div>

            <Link href="/" className="flex h-30 pb-6">
              <img
                src="/images/gallery/Diwan Logo-01.png"
                alt="Fakirdiwan Samaj Logo"
                className="h-full w-full object-left"
              />
            </Link>

            <p className="opacity-70">Toll free customer care</p>
            <p className="font-semibold mb-4">{contactInfo.phone}</p>

            <p className="opacity-70">Need live support</p>
            <p className="font-semibold mb-4">{contactInfo.email}</p>

            <p className="opacity-70">Office Hours</p>
            <p className="font-semibold">{contactInfo.officeHours}</p>

            {/* Social Icons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-(--color-accent) flex items-center justify-center hover:scale-105 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-(--color-accent) flex items-center justify-center hover:scale-105 transition"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-(--color-accent) flex items-center justify-center hover:scale-105 transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-(--color-accent) flex items-center justify-center hover:scale-105 transition"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:col-span-1 lg:col-span-3 flex pl-16 flex-col ">

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8">

              {/* Quick Links */}
              <div>
                <h4 className="mb-4 font-semibold text-lg">Quick Link</h4>

                <ul className="space-y-2 opacity-80">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-(--color-accent) transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="mb-4 font-semibold text-lg">Services</h4>

                <ul className="space-y-2 opacity-80">
                  <li>Education</li>
                  <li>Healthcare</li>
                  <li>Livelihoods</li>
                  <li>Women Empowerment</li>
                  <li>Disaster Response</li>
                  <li>Empowering Grassroots</li>
                  <li>Child Education</li>
                  <li>Blood Donation</li>
                </ul>
              </div>

              {/* Address */}
              <div>
                <h4 className="mb-4 font-semibold text-lg">Our Office</h4>

                <p className="opacity-80 leading-relaxed">
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state}
                  <br />
                  {contactInfo.address.zip}
                  <br />
                  {contactInfo.address.country}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 text-center bg-white/5 mt-10 rounded-md text-sm opacity-80">
          Copyright © {year} Diwan Foundation. All Rights Reserved.
        </div>

      </div>
    </footer>
  )
}