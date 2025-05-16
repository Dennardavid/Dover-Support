"use client";

import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";

export default function Summary() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await fetch("/api/tickets");
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

  // Calculate counts
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {loading ? (
        <p className="col-span-3 text-center text-gray-600">Loading...</p>
      ) : (
        stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 ${stat.bg} ${stat.ring} ring-1 flex justify-between items-center shadow-sm transition hover:scale-[1.02]`}
          >
            <div>
              <p className={`text-sm font-medium ${stat.text}`}>{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.text}`}>
                {stat.count}
              </p>
            </div>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${stat.iconBg}`}
            >
              <FaCaretRight className={`${stat.text} w-4 h-4`} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
