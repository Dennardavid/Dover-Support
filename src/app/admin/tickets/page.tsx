import PageHeader from "@/components/ui/pageheader";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Tickets() {
  const session = await auth();
  // console.log("SESSION:", session);

  const role = session?.user?.role;

  if (!session) {
    redirect("/");
  }
  if (role !== "ADMIN") {
    redirect("/users");
  }
  return (
    <>
      <PageHeader description="Admin Ticket History" message="" username=""/>
      <TicketsHistory description=" " />
    </>
  );
}
