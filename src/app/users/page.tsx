import PageHeader from "@/components/ui/pageheader";
import Summary from "@/components/ui/dashboardsummary";
import TicketsHistory from "@/components/ui/tickethistory";

export default function Home() {
  return (
    <>
      <PageHeader description="Dashboard" />
      <Summary />
      <TicketsHistory description="Ticket History" />
    </>
  );
}
