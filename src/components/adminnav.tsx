"use client";

import { img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { GrScorecard } from "react-icons/gr";
import LogoutButton from "./ui/logoutButton";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function AdminNavigation() {
  const pathname = usePathname();
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

  return (
    <nav className="bg-forestGreen w-[20%] h-dvh flex flex-col justify-between py-5 px-4">
      <div className="mt-8">
        <div className="flex flex-col items-center gap-5">
          <Image src={img.Logo} alt="prado" quality={100} priority={true} />
          <h1 className="text-white text-5xl font-extrabold">ADMIN</h1>
        </div>

        <ul className="space-y-6 mt-25">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // Compare the pathname with the link href

            return (
              <li
                key={link.href}
                className={"flex items-center justify-center"}
              >
                <Link
                  href={link.href}
                  className={`text-white bg-[#016a81]/50 flex justify-center gap-4 w-full rounded-xl py-2 ${
                    isActive ? " bg-amber-400" : ""
                  }`}
                >
                  {link.Icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <LogoutButton />
    </nav>
  );
}
