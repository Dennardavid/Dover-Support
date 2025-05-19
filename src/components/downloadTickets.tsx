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
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
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
      className="px-4 py-2 bg-forestGreen text-white rounded flex justify-center items-center gap-2"
    >
      <MdOutlineFileDownload size={25} />
      Download CSV
    </button>
  );
}
