// import { IoIosMore } from "react-icons/io";

const tickets = [
  {
    name: "Nikita",
    id: "T20-236",
    date: "03-04-2020",
    category: "Software",
    status: "Done",
  },
  {
    name: "Ricko",
    id: "T10-205",
    date: "07-04-2020",
    category: "Hardware",
    status: "Processing",
  },
  {
    name: "Hanks",
    id: "T30-340",
    date: "15-04-2020",
    category: "Network",
    status: "Pending",
  },
];

const statusStyles: Record<string, string> = {
  Done: "bg-cyan-100 text-cyan-700",
  Processing: "bg-orange-100 text-orange-700",
  Pending: "bg-rose-100 text-rose-700",
};

export default function TicketsHistory({
  description,
}: {
  description: string | null;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        {description}
      </h2>

      <div className="hidden md:grid grid-cols-5 gap-4 px-4 mb-2 text-sm font-medium text-slate-600">
        <span>Name</span>
        <span>ID Ticket</span>
        <span>Date</span>
        <span>Category</span>
        <span>Status</span>
        {/* <span>Actions</span> */}
      </div>

      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-5 gap-4 items-center bg-white px-4 py-3 rounded-lg shadow-sm"
          >
            <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">Name</span>
              <span>{ticket.name}</span>
            </div>

            <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">ID</span>
              <span>{ticket.id}</span>
            </div>

            <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">Date</span>
              <span>{ticket.date}</span>
            </div>

            <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">
                Category
              </span>
              <span>{ticket.category}</span>
            </div>

            <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">
                Status
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs text-center font-semibold ${
                  statusStyles[ticket.status]
                }`}
              >
                {ticket.status}
              </span>
            </div>

            {/* <div className="flex justify-between w-full md:contents">
              <span className="md:hidden font-medium text-slate-500">
                Actions
              </span>
              <IoIosMore className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
