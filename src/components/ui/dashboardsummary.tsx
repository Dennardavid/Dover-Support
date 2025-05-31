"use client";

import { useEffect, useState } from "react";
import { TfiTicket } from "react-icons/tfi";

export default function Summary() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await fetch("/api/ticketsDetail");
        const data = await result.json();
        if (result.ok) {
          setTickets(data);
        } else {
          console.error("Failed to fetch tickets:", data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const allCount = tickets.length;
  const inProcessCount = tickets.filter((t: any) => t.status === "open").length;
  const completedCount = tickets.filter(
    (t: any) => t.status === "closed"
  ).length;

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
      {loading
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
