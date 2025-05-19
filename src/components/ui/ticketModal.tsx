"use client";

import { IoClose } from "react-icons/io5";

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
    id: string;
    name: string;
    email: string;
    discipline: string;
  };
};

export default function TicketModal({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute -top-2 bg-forestGreen rounded-full p-2 -right-2 text-white cursor-pointer"
        >
          <IoClose size={25} />
        </button>

        <h2 className="text-xl font-bold mb-2 text-forestGreen">
          {ticket.title}
        </h2>
        <p className="text-md text-gray-600 mb-1">
          <strong>Name:</strong> {ticket.author?.name}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          <strong>Discipline:</strong> {ticket.author?.discipline}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          <strong>Category:</strong> {ticket.category}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          <strong>Description:</strong> {ticket.description}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          <strong>Status:</strong> {ticket.status}
        </p>
        <p className="text-lg text-gray-600 mb-1">
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Date created:</strong>{" "}
          {new Date(ticket.createAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
