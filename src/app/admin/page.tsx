import PageHeader from "@/components/ui/pageheader";
import Summary from "@/components/ui/dashboardsummary";
import TicketsHistory from "@/components/ui/tickethistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  const role = session?.user?.role;

  if (!session) {
    redirect("/");
  }
  if (role !== "ADMIN") {
    redirect("/users");
  }

  const userName = session?.user?.name;
  return (
    <>
      <PageHeader
        description="Admin Dashboard"
        message="Welcome,"
        username={userName}
      />
      <Summary />
      <TicketsHistory description="Recieved Tickets" />
    </>
  );
}
