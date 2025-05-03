import { FaCaretRight } from "react-icons/fa";

export default function Summary() {
  const stats = [
    {
      label: "All Ticket",
      count: 623,
      bg: "bg-orange-100",
      text: "text-orange-600",
      ring: "ring-orange-300",
      iconBg: "bg-orange-200",
    },
    {
      label: "In Process",
      count: 576,
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      ring: "ring-cyan-300",
      iconBg: "bg-cyan-200",
    },
    {
      label: "Completed Ticket",
      count: 602,
      bg: "bg-blue-100",
      text: "text-blue-600",
      ring: "ring-blue-300",
      iconBg: "bg-blue-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 ${stat.bg} ${stat.ring} ring-1 flex justify-between items-center shadow-sm transition hover:scale-[1.02]`}
        >
          <div>
            <p className={`text-sm font-medium ${stat.text}`}>{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.text}`}>
              {stat.count}
            </p>
          </div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${stat.iconBg}`}
          >
            <FaCaretRight className={`${stat.text} w-4 h-4`} />
          </div>
        </div>
      ))}
    </div>
  );
}
