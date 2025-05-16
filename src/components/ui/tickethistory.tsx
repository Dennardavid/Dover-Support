"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/dateFormater";

const statusStyles: Record<string, string> = {
  open: "bg-orange-100 text-orange-700",
  closed: "bg-cyan-100 text-cyan-700",
};

type Ticket = {
  title: string;
  id: string;
  createAt: string;
  category: string;
  status: string;
};

export default function TicketsHistory({
  description,
}: {
  description: string | null;
}) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch("/api/tickets");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    fetchTickets();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        {description}
      </h2>

      <div className="hidden md:grid grid-cols-4 gap-4 px-4 mb-2 text-sm font-medium text-slate-600">
        <span>Title</span>
        <span>Date Created</span>
        <span>Category</span>
        <span>Status</span>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <p className="text-center text-slate-500 mt-20">No tickets found.</p>
        ) : (
          tickets.map((ticket, index) => (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-4 gap-4 items-center bg-white px-4 py-3 rounded-lg shadow-sm"
            >
              <div className="flex justify-between w-full md:contents">
                <span className="md:hidden font-medium text-slate-500">
                  Name
                </span>
                <span>{ticket.title}</span>
              </div>

              <div className="flex justify-between w-full md:contents">
                <span className="md:hidden font-medium text-slate-500">
                  Date
                </span>
                <span>{formatDate(ticket.createAt)}</span>
              </div>

              <div className="flex justify-between w-full md:contents">
                <span className="md:hidden font-medium text-slate-500">
                  Category
                </span>
                <span>{ticket.category}</span>
              </div>

              <div className="flex justify-between w-full md:contents">
                <span className="md:hidden font-medium text-slate-500">
                  Status
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-center font-semibold ${
                    statusStyles[ticket.status]
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
