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
    <div className="flex flex-wrap gap-2 mb-5">
      {filterOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          className={`px-3 py-1 text-sm rounded-full border transition font-medium ${
            active === opt.value
              ? "bg-forestGreen text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
