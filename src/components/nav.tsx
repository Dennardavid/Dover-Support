"use client";

import Sidebar from "./sidebar";
import { IoHomeOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";

// Was ~110 lines of near-duplicate sidebar logic — see sidebar.tsx,
// which now holds the actual implementation shared with adminnav.tsx.
export default function Navigation() {
  const navLinks = [
    {
      href: "/users",
      label: "Dashboard",
      Icon: <IoHomeOutline fontSize={20} />,
    },
    {
      href: "/users/new-ticket",
      label: "Create Ticket",
      Icon: <GrScorecard fontSize={20} />,
    },
    {
      href: "/users/history",
      label: "Ticket History",
      Icon: <BsClockHistory fontSize={20} />,
    },
  ];

  return <Sidebar title="HELP DESK" navLinks={navLinks} />;
}
