import PageHeader from "@/components/ui/pageheader";
import Summary from "@/components/ui/dashboardsummary";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

   const userName = session?.user?.name;

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <>
      <PageHeader description="Dashboard" message="Welcome" username={userName}/>
      <Summary />
      <TicketsHistory description="Ticket History" />
    </>
  );
}
