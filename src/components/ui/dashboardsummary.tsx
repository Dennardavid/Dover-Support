"use client";

import useSWR from "swr";
import { TfiTicket } from "react-icons/tfi";
import { BsClockHistory } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
};

export default function Summary() {
  const { data: tickets, isLoading } = useSWR<Ticket[]>(
    "/api/ticketsDetail",
    fetcher
  );

  const allCount = tickets?.length ?? 0;
  const inProcessCount =
    tickets?.filter((t) => t.status === "open").length ?? 0;
  const completedCount =
    tickets?.filter((t) => t.status === "closed").length ?? 0;

  // Was orange/cyan/blue — three colors that don't appear anywhere
  // else in the app's palette (forestGreen / orange / gray). Now
  // built entirely from the actual brand colors, so the dashboard
  // reads as part of the same product rather than a generic
  // admin-template look. Each stat also gets its own icon now instead
  // of repeating the same ticket icon three times.
  const stats = [
    {
      label: "All Tickets",
      count: allCount,
      icon: <TfiTicket />,
      bg: "bg-forestGreen/5",
      text: "text-forestGreen",
      ring: "ring-forestGreen/10",
      iconBg: "bg-forestGreen/10",
    },
    {
      label: "In Process",
      count: inProcessCount,
      icon: <BsClockHistory />,
      bg: "bg-orange/5",
      text: "text-orange",
      ring: "ring-orange/15",
      iconBg: "bg-orange/10",
    },
    {
      label: "Closed Tickets",
      count: completedCount,
      icon: <FiCheckCircle />,
      bg: "bg-slate-50",
      text: "text-slate-600",
      ring: "ring-slate-200",
      iconBg: "bg-slate-200/70",
    },
  ];

  const skeletonCards = Array(3).fill(null);

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 md:mt-8">
      {isLoading
        ? skeletonCards.map((_, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-white ring-1 ring-slate-100 flex justify-between items-center shadow-sm animate-pulse"
            >
              <div>
                <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                <div className="h-6 w-16 bg-slate-300 rounded"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200" />
            </div>
          ))
        : stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 sm:p-6 ${stat.bg} ${stat.ring} ring-1 flex justify-between items-center shadow-sm transition-shadow hover:shadow-md`}
            >
              <div>
                <p className={`text-sm sm:text-base font-medium ${stat.text}`}>
                  {stat.label}
                </p>
                <p
                  className={`text-2xl sm:text-3xl font-bold mt-1 ${stat.text}`}
                >
                  {stat.count}
                </p>
              </div>
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <span className={`${stat.text} text-base sm:text-lg`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
}
