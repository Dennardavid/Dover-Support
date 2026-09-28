"use client";

import { img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import LogoutButton from "./ui/logoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export type NavLink = {
  href: string;
  label: string;
  Icon: React.ReactNode;
};

// STRUCTURE CHANGE: this replaces two separate nav.tsx / adminnav.tsx
// implementations, which were near-identical copies of each other (same
// hamburger/backdrop/scroll-lock/active-link logic, different title and
// link list). Both now just call this component with their own links —
// see the bottom of nav.tsx / adminnav.tsx for how thin they've become.
export default function Sidebar({
  title,
  navLinks,
}: {
  title: string;
  navLinks: NavLink[];
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scroll when the mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Hamburger Icon (mobile only) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          className="md:hidden fixed top-4 left-4 z-30 text-white bg-forestGreen p-2.5 rounded-lg shadow-md active:scale-95 transition"
        >
          <IoMenu size={22} />
        </button>
      )}

      {/* Backdrop when sidebar is open (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          "bg-forestGreen fixed top-0 left-0 h-dvh w-64 md:w-[20%] z-40 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
            "md:translate-x-0 md:static": true,
          }
        )}
      >
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-4">
          <Image src={img.Logo} alt="Dover logo" quality={100} priority />
          <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide">
            {title}
          </h1>
        </div>

        {/* Divider — subtle separation between branding and nav, instead
            of relying on spacing alone */}
        <div className="h-px bg-white/10 mt-6" />

        {/* Nav Links */}
        <ul className="space-y-1.5 mt-6 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 w-full rounded-lg py-2.5 px-4 text-[15px] font-medium transition-colors",
                    // Was `bg-amber-400` for the active link — amber
                    // doesn't appear anywhere else in the palette
                    // (forestGreen / orange / gray). The orange brand
                    // accent now marks "active" consistently with how
                    // it's used everywhere else (buttons, links,
                    // highlights). Inactive links are transparent by
                    // default rather than always showing a semi-opaque
                    // fill, so "active" actually means something.
                    isActive
                      ? "bg-orange text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.Icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="mt-4">
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}
