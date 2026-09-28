"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import ModalWrapper from "@/components/ui/modalWrapper";
import ConfirmModal from "@/components/ui/confirmModal";
import Badge from "@/components/ui/badge";
import {
  statusBadgeClasses,
  priorityBadgeClasses,
  categoryBadgeClasses,
} from "@/lib/ticketBadges";
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
  const [showImageModal, setShowImageModal] = useState(false);
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
      console.error(error);
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
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Small label/value pair — used throughout the details column below so
  // every field lines up the same way instead of each one having its own
  // one-off "**Label:** value" markup.
  function Field({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <div className="text-slate-700 mt-0.5">{children}</div>
      </div>
    );
  }

  return (
    <>
      <ModalWrapper onClose={onClose}>
        {/*
          Badges now live right under the title, before any other
          detail — status/priority/category are the three things
          you'd want to register in the first second of opening a
          ticket, so they're no longer buried a few lines down mixed
          in with plain text fields.
        */}
        <h2 className="text-xl md:text-2xl font-semibold text-forestGreen pr-8">
          {ticket.title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <Badge className={statusBadgeClasses(ticket.status)}>
            {ticket.status.toUpperCase()}
          </Badge>
          <Badge className={priorityBadgeClasses(ticket.priority)}>
            {ticket.priority.toUpperCase()} PRIORITY
          </Badge>
          <Badge className={categoryBadgeClasses()}>{ticket.category}</Badge>
        </div>

        <div className="text-sm md:text-base flex flex-col md:flex-row gap-5 md:gap-6">
          {/* Ticket Details */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Submitted by">{ticket.author?.name}</Field>
              <Field label="Discipline">{ticket.author?.discipline}</Field>
              <Field label="Date created">
                {new Date(ticket.createdAt).toLocaleString()}
              </Field>
              {ticket.status === "closed" && (
                <Field label="Date closed">
                  {new Date(ticket.updatedAt).toLocaleString()}
                </Field>
              )}
            </div>

            <Field label="Description">
              <span className="whitespace-pre-wrap">{ticket.description}</span>
            </Field>
          </div>

          {/* Ticket Screenshot - Only if exists */}
          {ticket.screenshot && (
            <div
              className="flex-shrink-0 self-center md:self-start cursor-pointer group"
              onClick={() => setShowImageModal(true)}
            >
              <div className="rounded-lg overflow-hidden ring-1 ring-slate-200">
                <Image
                  src={`/uploads/${ticket.screenshot}`}
                  alt="Ticket Screenshot"
                  className="max-w-[180px] h-auto group-hover:opacity-80 transition"
                  height={180}
                  width={180}
                />
              </div>
              <p className="text-xs text-center text-slate-400 mt-1.5">
                Click to enlarge
              </p>
            </div>
          )}
        </div>

        {/* Display Close Ticket button for ADMIN */}
        {ticket.status === "open" && isAdmin && (
          <div className="mt-5 md:mt-6 space-y-3 text-sm md:text-base border-t border-slate-100 pt-5">
            <textarea
              rows={2}
              placeholder="Optional: Notes about the work done..."
              className="w-full resize-none border-slate-300 focus:ring-1 focus:ring-forestGreen p-3 border rounded-md focus:outline-none"
              value={workNote}
              onChange={(e) => setWorkNote(e.target.value)}
            />
            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-forestGreen hover:bg-[#025E50] text-white px-4 py-2 rounded-lg w-full transition"
            >
              Close Ticket
            </button>
          </div>
        )}

        {/* Display Reopen Ticket button */}
        {ticket.status === "closed" && (
          <div className="mt-5 md:mt-6 border-t border-slate-100 pt-5">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="bg-forestGreen hover:bg-[#025E50] text-white px-4 py-2 rounded-lg w-full transition"
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
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto shadow-xl"
          >
            <Image
              src={`/uploads/${ticket.screenshot}`}
              alt="Full Ticket Screenshot"
              width={800}
              height={800}
              className="w-full h-auto rounded"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="mt-4 bg-forestGreen text-white px-4 py-2 rounded hover:bg-[#025E50] transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
