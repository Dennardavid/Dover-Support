"use client";

import useSWR from "swr";
import { formatDate } from "@/lib/dateFormater";
import TicketModal from "@/components/ui/ticketModal";
import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import TicketFilter from "@/components/ui/TicketFilter";

const statusStyles: Record<string, string> = {
  open: "bg-orange-100 text-orange-700",
  closed: "bg-cyan-100 text-cyan-700",
};

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
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const searchParams = useSearchParams();

  useEffect(() => {
    const current = searchParams.get("filter") || "all";
    setFilter(current);
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(7);
      } else {
        setItemsPerPage(30);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredTickets = tickets?.filter((ticket) =>
    filter === "all"
      ? true
      : ticket.status === filter || ticket.priority === filter
  );

  const totalPages = Math.ceil((filteredTickets?.length ?? 0) / itemsPerPage);
  const currentTickets = filteredTickets?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const skeletonRows = Array(itemsPerPage).fill(null);

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">Error loading tickets.</p>
    );
  }

  return (
    <>
      <div className="mt-5 md:mt-10">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">
          {description}
        </h2>

        <TicketFilter />
        {/* Header for Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-2 text-base font-medium text-slate-600">
          <span>Date Created</span>
          <span>Title</span>
          <span>Category</span>
          <span>Status</span>
        </div>

        <div className="space-y-3 md:space-y-4">
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
          ) : currentTickets && currentTickets.length === 0 ? (
            <p className="text-center text-slate-500 mt-20">
              No tickets found.
            </p>
          ) : (
            currentTickets?.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg shadow-sm px-4 py-3 hover:bg-gray-50 transition"
              >
                <div
                  onClick={() => setSelectedTicket(ticket)}
                  className="cursor-pointer flex flex-col md:grid md:grid-cols-4 gap-4 text-sm md:text-base"
                >
                  {/* Mobile Labels */}
                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden text-sm text-slate-500">
                      Date
                    </span>
                    <span className="text-slate-700">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>

                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden text-sm text-slate-500">
                      Title
                    </span>
                    <span className="text-slate-700">{ticket.title}</span>
                  </div>

                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden text-sm text-slate-500">
                      Category
                    </span>
                    <span className="text-slate-700">{ticket.category}</span>
                  </div>

                  <div className="flex justify-between w-full md:contents">
                    <span className="md:hidden text-sm text-slate-500">
                      Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${
                        statusStyles[ticket.status]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-3 flex justify-end md:hidden">
                  <button
                    onClick={() =>
                      alert(`Requesting update for ticket: ${ticket.title}`)
                    }
                    className="flex items-center gap-2 text-sm font-medium text-white bg-forestGreen hover:bg-green-700 transition px-3 py-2 rounded-lg"
                  >
                    <FiExternalLink size={16} />
                    Follow up
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded border text-sm font-medium transition ${
                  currentPage === num
                    ? "bg-forestGreen text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>

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
