"use client";

import useSWR from "swr";
import { TfiTicket } from "react-icons/tfi";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
};

export default function Summary() {
  const {
    data: tickets,
    isLoading,
  } = useSWR<Ticket[]>("/api/ticketsDetail", fetcher);

  const allCount = tickets?.length ?? 0;
  const inProcessCount =
    tickets?.filter((t) => t.status === "open").length ?? 0;
  const completedCount =
    tickets?.filter((t) => t.status === "closed").length ?? 0;

  const stats = [
    {
      label: "All Ticket",
      count: allCount,
      bg: "bg-orange-100",
      text: "text-orange-600",
      ring: "ring-orange-300",
      iconBg: "bg-orange-200",
    },
    {
      label: "In Process",
      count: inProcessCount,
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      ring: "ring-cyan-300",
      iconBg: "bg-cyan-200",
    },
    {
      label: "Closed Tickets",
      count: completedCount,
      bg: "bg-blue-100",
      text: "text-blue-600",
      ring: "ring-blue-300",
      iconBg: "bg-blue-200",
    },
  ];

  const skeletonCards = Array(3).fill(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {isLoading
        ? skeletonCards.map((_, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-gray-100 ring-1 ring-gray-200 flex justify-between items-center shadow-sm animate-pulse"
            >
              <div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-400 rounded"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300" />
            </div>
          ))
        : stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 ${stat.bg} ${stat.ring} ring-1 flex justify-between items-center shadow-sm`}
            >
              <div>
                <p className={`text-sm font-medium ${stat.text}`}>
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-1 ${stat.text}`}>
                  {stat.count}
                </p>
              </div>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <TfiTicket className={`${stat.text} w-4 h-4`} />
              </div>
            </div>
          ))}
    </div>
  );
}
