"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import ModalWrapper from "@/components/ui/modalWrapper";
import ConfirmModal from "@/components/ui/confirmModal";
import Image from "next/image";

export default function TicketDetailsModal({
  ticket,
  onUpdate,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
  onUpdate?: () => void;
}) {
  const [workNote, setWorkNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "ADMIN";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showConfirmModal) {
          setShowConfirmModal(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfirmModal, onClose]);

  const handleCloseTicket = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/closeTicket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ticket.id,
          message: workNote.trim() || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to close ticket");

      toast.success("Ticket closed successfully.");
      onUpdate?.();
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenTicket = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reopenTicket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ticket.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to Re-open ticket");

      toast.success("Ticket Re-opened successfully.");
      onUpdate?.();
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusBadge =
    ticket.status === "open"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const priorityBadge = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <>
      <ModalWrapper onClose={onClose}>
        <h2 className="text-2xl font-semibold mb-2 md:mb-4 text-forestGreen">
          {ticket.title}
        </h2>

        <div className="text-gray-700 text-sm md:text-base flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Ticket Details */}
          <div className="flex-1 space-y-3 md:space-y-4">
            <div>
              <strong>Name:</strong> {ticket.author?.name}
            </div>
            <div>
              <strong>Discipline:</strong> {ticket.author?.discipline}
            </div>
            <div>
              <strong>Category:</strong> {ticket.category}
            </div>
            <div>
              <strong>Description:</strong>
              <span className="whitespace-pre-wrap"> {ticket.description}</span>
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-md font-medium ${statusBadge}`}
              >
                {ticket.status.toUpperCase()}
              </span>
            </div>
            <div>
              <strong>Priority:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-md font-medium ${
                  priorityBadge[
                    ticket.priority.toLowerCase() as "low" | "medium" | "high"
                  ]
                }`}
              >
                {ticket.priority.toUpperCase()}
              </span>
            </div>
            <div>
              <strong>Date Created:</strong>{" "}
              {new Date(ticket.createdAt).toLocaleString()}
            </div>
            {ticket.status === "closed" && (
              <div>
                <strong>Date Closed:</strong>{" "}
                {new Date(ticket.updatedAt).toLocaleString()}
              </div>
            )}
          </div>

          {/* Ticket Screenshot - Only if exists */}
          {ticket.screenshot && (
            <div className="flex-shrink-0 self-center md:self-start">
              <Image
                src={`/uploads/${ticket.screenshot}`}
                alt="Ticket Screenshot"
                className="rounded-md max-w-xs h-auto"
                height={250}
                width={250}
              />
            </div>
          )}
        </div>

        {/* Display Close Ticket button for ADMIN */}
        {ticket.status === "open" && isAdmin && (
          <div className="mt-4 md:mt-6 space-y-2 md:space-y-4 text-sm md:text-base">
            <textarea
              rows={2}
              placeholder="Optional: Notes about the work done..."
              className="w-full resize-none border-gray-300 focus:ring-1 focus:ring-forestGreen p-3 border rounded-md focus:outline-none"
              value={workNote}
              onChange={(e) => setWorkNote(e.target.value)}
            />
            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-forestGreen hover:bg-[#025E50] delay-100 text-white px-4 py-2 rounded-lg w-full transition"
            >
              Close Ticket
            </button>
          </div>
        )}

        {/* Display Reopen Ticket button */}
        {ticket.status === "closed" && (
          <div className="mt-6 space-y-4">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-forestGreen hover:bg-[#025E50] delay-100 text-white px-4 py-2 rounded-lg w-full transition"
            >
              Re-open Ticket
            </button>
          </div>
        )}
      </ModalWrapper>

      {showConfirmModal && (
        <ConfirmModal
          message={
            ticket.status === "open"
              ? "Are you sure you want to close this ticket?"
              : "Are you sure you want to re-open this ticket?"
          }
          header={
            ticket.status === "open" ? "Confirm Close" : "Confirm Re-open"
          }
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={
            ticket.status === "closed" ? handleOpenTicket : handleCloseTicket
          }
          isLoading={isSubmitting}
        />
      )}
    </>
  );
}
