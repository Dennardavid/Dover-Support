"use client";

import { img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { GrAnalytics, GrScorecard } from "react-icons/gr";
import LogoutButton from "./ui/logoutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function AdminNavigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    {
      href: "/admin",
      label: "Overview",
      Icon: <IoHomeOutline color="white" fontSize={25} />,
    },
    {
      href: "/admin/tickets",
      label: "Tickets",
      Icon: <GrScorecard color="white" fontSize={25} />,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      Icon: <GrAnalytics color="white" fontSize={25} />,
    },
  ];

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Hamburger menu (mobile only) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 text-white bg-forestGreen p-2 rounded-lg"
        >
          <IoMenu size={24} />
        </button>
      )}

      {/* Backdrop */}
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
            ADMIN
          </h1>
        </div>

        {/* Nav Links */}
        <ul className="space-y-6 mt-10 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="flex items-center justify-center">
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    "text-white bg-[#016a81]/50 flex justify-center gap-4 w-full rounded-xl py-2",
                    {
                      "bg-amber-400": isActive,
                    }
                  )}
                >
                  {link.Icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout button */}
        <div className="mt-8 md:mt-0">
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}
