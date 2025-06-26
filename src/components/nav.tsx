"use client";

import { img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import LogoutButton from "./ui/logoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    {
      href: "/users",
      label: "Dashboard",
      Icon: <IoHomeOutline color="white" fontSize={25} />,
    },
    {
      href: "/users/new-ticket",
      label: "Create Ticket",
      Icon: <GrScorecard color="white" fontSize={25} />,
    },
    {
      href: "/users/history",
      label: "Ticket History",
      Icon: <BsClockHistory color="white" fontSize={25} />,
    },
  ];

  // Prevent body scroll when sidebar is open
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
          className="md:hidden fixed top-4 left-4 z-30 text-white bg-forestGreen p-2 rounded-lg"
        >
          <IoMenu size={24} />
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
          "bg-forestGreen fixed top-0 left-0 h-dvh w-64 md:w-[20%] z-40 flex flex-col py-5 px-4 transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
            "md:translate-x-0 md:static": true,
          }
        )}
      >
        {/* Logo and Title */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <Image src={img.Logo} alt="prado" quality={100} priority />
          <h1 className="text-white text-3xl md:text-5xl font-extrabold">
            HELP DESK
          </h1>
        </div>

        {/* Nav Links */}
        <ul className="space-y-6 mt-10 flex-1">
          {navLinks.map((link) => (
            <li key={link.href} className="flex items-center justify-center">
              <Link
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  "text-white bg-[#016a81]/50 flex justify-center gap-4 w-full rounded-xl py-2",
                  {
                    "bg-amber-400": pathname === link.href,
                  }
                )}
              >
                {link.Icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-8 md:mt-0">
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}
