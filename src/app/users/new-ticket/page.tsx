import PageHeader from "@/components/ui/pageheader";
import TicketFormWrapper from "@/components/ticketFormWrapper";
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
      <TicketFormWrapper />
    </>
  );
}
