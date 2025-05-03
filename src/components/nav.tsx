"use client";

import { img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { IoIosPower } from "react-icons/io";
import { usePathname } from "next/navigation"; // Import usePathname hook
import clsx from "clsx";

export default function Navigation() {
  const pathname = usePathname();
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

  return (
    <nav className="bg-forestGreen w-[20%] h-dvh flex flex-col justify-between py-5 px-4">
      <div className="mt-8">
        <div className="flex items-center gap-5">
          <Image src={img.Logo} alt="prado" quality={100} priority={true} />
          <h1 className="text-white text-3xl font-bold">Support Tickets</h1>
        </div>

        <ul className="space-y-6 mt-25">
          {navLinks.map((link) => {
            return (
              <li
                key={link.href}
                className={"flex items-center justify-center"}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    "text-white bg-[#016a81]/50 flex justify-center gap-4 w-full rounded-xl py-2",
                    {
                      " bg-amber-400": pathname === link.href,
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
      </div>

      <form
        action="../auth/signout"
        method="POST"
        className="flex items-center"
      >
        <button
          type="submit"
          className="w-full text-white bg-red-500 hover:bg-red-700 rounded-xl py-2 transition flex justify-center items-center gap-2"
        >
          <IoIosPower color="white" fontSize={25} />
          Logout
        </button>
      </form>
    </nav>
  );
}
