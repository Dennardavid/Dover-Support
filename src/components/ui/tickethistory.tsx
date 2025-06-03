"use client";

import useSWR from "swr";
import { formatDate } from "@/lib/dateFormater";
import TicketModal from "@/components/ui/ticketModal";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const statusStyles: Record<string, string> = {
  open: "bg-orange-100 text-orange-700",
  closed: "bg-cyan-100 text-cyan-700",
};

/* SWR fetcher instead of useEffect */
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
};

export default function TicketsHistory({
  description,
}: {
  description: string | null;
}) {
  const {
    data: tickets,
    error,
    isLoading,
    mutate,
  } = useSWR<Ticket[]>("/api/ticketsDetail", fetcher);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const skeletonRows = Array(5).fill(null);

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">Error loading tickets.</p>
    );
  }

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
          {isLoading ? (
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
          ) : tickets && tickets.length === 0 ? (
            <p className="text-center text-slate-500 mt-20">
              No tickets found.
            </p>
          ) : (
            tickets?.map((ticket) => (
              <div key={ticket.id} className="space-y-2">
                <div
                  onClick={() => setSelectedTicket(ticket)}
                  className="cursor-pointer flex flex-col md:grid md:grid-cols-4 gap-4 items-center bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden font-medium text-slate-500">
                      Date
                    </span>
                    <span>{formatDate(ticket.createdAt)}</span>
                  </div>

                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden font-medium text-slate-500">
                      Title
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

                <button
                  onClick={() =>
                    alert(`Requesting update for ticket: ${ticket.title}`)
                  }
                  className="text-white bg-forestGreen p-2 rounded-xl"
                >
                  <FiExternalLink size={20} />
                </button>
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
          onUpdate={mutate}
        />
      )}
    </>
  );
}
