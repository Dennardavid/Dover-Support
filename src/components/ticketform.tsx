"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ticketValidation } from "@/lib/zodrules";
import ConfirmModal from "./ui/confirmModal";
import { toast } from "sonner";

export default function TicketForm({ onMutate }: { onMutate?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    upload: null as File | null,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const parsed = ticketValidation.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("priority", form.priority);
    if (form.upload) {
      formData.append("upload", form.upload);
    }

    const response = await fetch("/api/createTicket", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);

      onMutate?.();
      router.push("/users");

      setForm({
        title: "",
        description: "",
        category: "",
        priority: "",
        upload: null as File | null,
      });
      setIsSubmitting(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form className="bg-white mt-4 md:mt-8 py-4 px-4 md:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-6 text-forestGreen">Ticket Form</h2>

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

          {/* Upload Screenshot */}
          <div>
            <label
              htmlFor="upload"
              className="block text-base font-medium text-gray-700"
            >
              Upload a screenshot (Optional)
            </label>
            <div className="relative mt-1">
              <input
                type="file"
                id="upload"
                name="upload"
                onChange={(e) =>
                  setForm({ ...form, upload: e.target.files?.[0] ?? null })
                }
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-forestGreen file:text-white
                 hover:file:bg-[#025E50] transition cursor-pointer"
              />
            </div>
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
              <option defaultValue="">Select a category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
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
              <option defaultValue="">Select a category</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority}</p>
            )}
          </div>
        </div>
      </div>

      {/* Button aligned to the end (right) */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const isValid = validateForm();
            if (isValid) {
              setShowConfirmModal(true);
            }
          }}
          className="bg-forestGreen text-white text-sm md:text-base px-6 py-2 rounded-full hover:bg-[#025E50] transition"
        >
          Submit
        </button>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          header="Confirm Create"
          message="Are you sure you want to create a ticket?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit}
          isLoading={isSubmitting}
        />
      )}
    </form>
  );
}
