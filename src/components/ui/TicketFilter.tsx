"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
];

export default function TicketFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("all");

  useEffect(() => {
    const current = searchParams.get("filter") || "all";
    setActive(current);
  }, [searchParams]);

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.replace(`?${params.toString()}`);
    setActive(value);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filterOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          className={`px-3.5 py-1.5 text-sm rounded-full border transition-colors font-medium ${
            active === opt.value
              ? "bg-forestGreen text-white border-forestGreen"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
