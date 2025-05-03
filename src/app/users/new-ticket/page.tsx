import PageHeader from "@/components/ui/pageheader";
import TicketForm from "@/components/ticketform";

export default function Tickets() {
  return (
    <>
      <PageHeader description="Create Ticket" />
      <TicketForm />
    </>
  );
}
