"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, User as UserIcon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/bookings", active: false },
  // { label: "Admin", href: "#admin", active: false },
];

const userLinks = [
  { label: "Profile", href: "#profile", icon: true },
  { label: "Login", href: "#login", icon: false },
  { label: "Sign Up", href: "#signup", icon: false },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="relative flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={120}
            height={28}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-5 text-sm font-medium md:flex md:gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={
                  link.active
                    ? "text-[#0f9b96] underline decoration-2 underline-offset-8"
                    : "text-foreground/90 transition-colors hover:text-[#0f9b96]"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 text-sm font-medium md:flex md:gap-7">
          {userLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 text-foreground/90 transition-colors hover:text-[#0f9b96]"
            >
              {link.icon && <UserIcon className="size-4" />}
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
          className="ml-auto flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    link.active
                      ? "block rounded-lg bg-muted px-3 py-2.5 text-[#0f9b96]"
                      : "block rounded-lg px-3 py-2.5 text-foreground/90 transition-colors hover:bg-muted hover:text-[#0f9b96]"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-2 h-px bg-border" />
          <ul className="flex flex-col text-sm font-medium">
            {userLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-foreground/90 transition-colors hover:bg-muted hover:text-[#0f9b96]"
                >
                  {link.icon && <UserIcon className="size-4" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
