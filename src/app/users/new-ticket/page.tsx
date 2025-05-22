import PageHeader from "@/components/ui/pageheader";
import TicketForm from "@/components/ticketform";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Tickets() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <>
      <PageHeader description="Create Ticket" message="" username="" />
      <TicketForm />
    </>
  );
}
