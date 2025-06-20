import PageHeader from "@/components/ui/pageheader";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DownloadTickets from "@/components/downloadTickets";

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
      <div className="flex items-center justify-between">
        <PageHeader description="All Tickets" message="" username="" />
        <DownloadTickets />
      </div>

      <TicketsHistory description="" />
    </>
  );
}
