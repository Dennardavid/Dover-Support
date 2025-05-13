import PageHeader from "@/components/ui/pageheader";
import Summary from "@/components/ui/dashboardsummary";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  // console.log("SESSION:", session);

  if (!session?.user) {
    return redirect("/");
  }
  
  return (
    <>
      <PageHeader description="Dashboard" />
      <Summary />
      <TicketsHistory description="Ticket History" />
    </>
  );
}
