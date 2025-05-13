import PageHeader from "@/components/ui/pageheader";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Tickets() {
  const session = await auth();
  // console.log("SESSION:", session);

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <>
      <PageHeader description="Ticket History" />
      <TicketsHistory description=" " />
    </>
  );
}
