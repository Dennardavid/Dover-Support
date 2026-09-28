"use client";

import Sidebar from "./sidebar";
import { IoHomeOutline } from "react-icons/io5";
import { GrAnalytics, GrScorecard } from "react-icons/gr";

// Was ~115 lines of near-duplicate sidebar logic — see sidebar.tsx,
// which now holds the actual implementation shared with nav.tsx.
export default function AdminNavigation() {
  const navLinks = [
    {
      href: "/admin",
      label: "Overview",
      Icon: <IoHomeOutline fontSize={20} />,
    },
    {
      href: "/admin/tickets",
      label: "Tickets",
      Icon: <GrScorecard fontSize={20} />,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      Icon: <GrAnalytics fontSize={20} />,
    },
  ];

  return <Sidebar title="ADMIN" navLinks={navLinks} />;
}
