// Shared badge color mappings — previously duplicated (and slightly
// inconsistent) between tickethistory.tsx and ticketModal.tsx. Keeping
// them here means the ticket list and the ticket detail modal always
// agree on what "open" or "high priority" looks like.

export function statusBadgeClasses(status: string) {
  switch (status) {
    case "open":
      return "bg-orange/10 text-orange";
    case "closed":
      return "bg-forestGreen/10 text-forestGreen";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function priorityBadgeClasses(priority: string) {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700";
    case "medium":
      return "bg-orange/10 text-orange";
    case "low":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function categoryBadgeClasses() {
  // Category is informational rather than status-like, so it gets a
  // single neutral treatment rather than per-value colors.
  return "bg-forestGreen/5 text-forestGreen";
}
