"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/dateFormater";
import TicketModal from "@/components/ui/ticketModal";

const statusStyles: Record<string, string> = {
  open: "bg-orange-100 text-orange-700",
  closed: "bg-cyan-100 text-cyan-700",
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    discipline: string;
  };
};

export default function TicketsHistory({
  description,
}: {
  description: string | null;
}) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch("/api/ticketsDetail");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const skeletonRows = Array(5).fill(null); 

  return (
    <>
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          {description}
        </h2>

        <div className="hidden md:grid grid-cols-4 gap-4 px-4 mb-2 text-sm font-medium text-slate-600">
          <span>Date Created</span>
          <span>Title</span>
          <span>Category</span>
          <span>Status</span>
        </div>

        <div className="space-y-4">
          {loading ? (
            skeletonRows.map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:grid md:grid-cols-4 gap-4 bg-gray-100 px-4 py-3 rounded-lg shadow-sm animate-pulse"
              >
                <div className="h-4 w-28 bg-gray-300 rounded"></div>
                <div className="h-4 w-36 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-80 bg-gray-300 rounded-full"></div>
              </div>
            ))
          ) : tickets.length === 0 ? (
            <p className="text-center text-slate-500 mt-20">
              No tickets found.
            </p>
          ) : (
            tickets.map((ticket, index) => (
              <div
                key={index}
                onClick={() => setSelectedTicket(ticket)}
                className="cursor-pointer flex flex-col md:grid md:grid-cols-4 gap-4 items-center bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex justify-between w-full md:contents">
                  <span className="md:hidden font-medium text-slate-500">
                    Name
                  </span>
                  <span>{formatDate(ticket.createdAt)}</span>
                </div>

                <div className="flex justify-between w-full md:contents">
                  <span className="md:hidden font-medium text-slate-500">
                    Date
                  </span>
                  <span>{ticket.title}</span>
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

      {/* Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}
