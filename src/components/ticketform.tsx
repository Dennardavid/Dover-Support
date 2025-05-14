"use client";

import { useState } from "react";
import { ticketValidation } from "@/lib/zodrules";
import { toast } from "sonner";

export default function TicketForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});

    const parsed = ticketValidation.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const response = await fetch("/api/createTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);

      /* Delay the page redirect by 2secs */
      setTimeout(() => {
        window.location.href = "/users";
      }, 2000);

      setForm({
        title: "",
        description: "",
        category: "",
        priority: "",
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="bg-white mt-8 p-6 rounded-lg shadow-md w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#1b1b1b]">Ticket Form</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="title"
              id="subject"
              value={form.title}
              required
              autoComplete="off"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              id="description"
              value={form.description}
              required
              autoComplete="off"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Right column - selects */}
        <div className="flex-1 space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={form.category}
              required
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Network">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-base font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={form.priority}
              required
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Button aligned to the end (right) */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-forestGreen text-white px-6 py-2 rounded-full hover:bg-orange transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
