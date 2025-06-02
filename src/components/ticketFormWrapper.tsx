"use client";

import useSWR from "swr";
import TicketForm from "./ticketform";
import fetcher from "@/lib/fetcher"; // you can define a basic fetcher: (url) => fetch(url).then(res => res.json())

export default function TicketFormWrapper() {
  const { mutate } = useSWR("/api/ticketsDetail", fetcher);

  return <TicketForm onMutate={mutate} />;
}
