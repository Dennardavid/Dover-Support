"use client";

import jsonToCsvExport from "json-to-csv-export";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createAt: string;
  updatedAt: string;
  workNote: string;
  author: {
    name: string;
    email: string;
    discipline: string;
  };
};

export default function DownloadTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("/api/ticketsDetail");
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    };
    fetchTickets();
  }, []);

  const handleDownload = () => {
    const exportData = tickets.map((ticket) => ({
      ID: ticket.id,
      Title: ticket.title,
      Description: ticket.description,
      Category: ticket.category,
      Priority: ticket.priority,
      Status: ticket.status,
      "Date Created": ticket.createAt,
      "Date Updated": ticket.updatedAt,
      "Author Name": ticket.author?.name || "",
      "Author Email": ticket.author?.email || "",
      Discipline: ticket.author?.discipline || "",
      workNote: ticket?.workNote || "",
    }));

    jsonToCsvExport({
      data: exportData,
      filename: "tickets_export",
      delimiter: ",",
    });
  };

  return (
    <button
      onClick={handleDownload}
      aria-label="Download ticket data as CSV"
      className="sm:w-fit py-2 px-2 md:px-2 bg-forestGreen hover:bg-[#025E50] transition-colors duration-200 text-white rounded flex items-center justify-center gap-2 text-sm sm:text-base"
    >
      <MdOutlineFileDownload size={20} />
      <span className="truncate">Download</span>
    </button>
  );
}
