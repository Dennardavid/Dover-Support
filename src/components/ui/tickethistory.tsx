"use client";

import useSWR from "swr";
import { formatDate } from "@/lib/dateFormater";
import TicketModal from "@/components/ui/ticketModal";
import Badge from "@/components/ui/badge";
import { statusBadgeClasses, priorityBadgeClasses } from "@/lib/ticketBadges";
import { useState, useEffect } from "react";
import { FiExternalLink, FiInbox } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import TicketFilter from "@/components/ui/TicketFilter";

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

        {/*
          Previously the column header sat outside/above the list of
          individual white cards, so the "table" wasn't actually one
          visual object — it was a label followed by a stack of
          unrelated-looking cards. Wrapping everything in one
          rounded/bordered panel (with dividers between rows instead of
          gaps + individual shadows) makes it read as a single table
          again, closer to what the column header implies.
        */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
          {/* Header for Desktop */}
          <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50 border-b border-slate-100">
            <span>Date Created</span>
            <span>Title</span>
            <span>Category</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoading ? (
              skeletonRows.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 px-5 py-4 animate-pulse"
                >
                  <div className="h-4 w-28 bg-slate-200 rounded"></div>
                  <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
                  <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
                </div>
              ))
            ) : currentTickets && currentTickets.length === 0 ? (
              // Was a single line of gray text floating in empty
              // space. A short icon + message reads as an intentional
              // state rather than looking like something failed to
              // load.
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                <FiInbox size={32} />
                <p className="text-sm">No tickets found.</p>
              </div>
            ) : (
              currentTickets?.map((ticket) => (
                <div
                  key={ticket.id}
                  className="px-5 py-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div
                    onClick={() => setSelectedTicket(ticket)}
                    className="cursor-pointer flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-2 md:gap-4 text-sm md:text-base md:items-center"
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
                      <span className="text-slate-800 font-medium">
                        {ticket.title}
                      </span>
                    </div>

                    <div className="flex justify-between w-full md:contents">
                      <span className="md:hidden text-sm text-slate-500">
                        Category
                      </span>
                      <span className="text-slate-600">{ticket.category}</span>
                    </div>

                    {/*
                      Priority wasn't shown in the list at all before —
                      you had to open each ticket individually to see
                      how urgent it was. Scanning a list of 30 tickets
                      for anything "High" priority meant clicking into
                      every single one.
                    */}
                    <div className="flex justify-between w-full md:contents">
                      <span className="md:hidden text-sm text-slate-500">
                        Priority
                      </span>
                      <Badge className={priorityBadgeClasses(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>

                    <div className="flex justify-between w-full md:contents">
                      <span className="md:hidden text-sm text-slate-500">
                        Status
                      </span>
                      <Badge className={statusBadgeClasses(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-3 flex justify-end md:hidden">
                    <button
                      onClick={() =>
                        alert(`Requesting update for ticket: ${ticket.title}`)
                      }
                      className="flex items-center gap-2 text-sm font-medium text-white bg-forestGreen hover:bg-[#025E50] transition px-3 py-2 rounded-lg"
                    >
                      <FiExternalLink size={16} />
                      Follow up
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-1.5 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                  currentPage === num
                    ? "bg-forestGreen text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
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
