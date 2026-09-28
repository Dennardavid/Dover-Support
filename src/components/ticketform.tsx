"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ticketValidation } from "@/lib/zodrules";
import ConfirmModal from "./ui/confirmModal";
import { toast } from "sonner";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

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
    >,
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

  // Consistent input styling used throughout — pulled into one constant
  // so a field's border actually goes red on its own when it fails
  // validation, not just the text underneath it. Previously an invalid
  // field looked completely normal until you spotted a small red line
  // of text below it.
  const fieldClass = (hasError: boolean) =>
    `mt-1 block w-full border rounded-md shadow-sm p-2.5 transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-300 focus:ring-red-200"
        : "border-slate-300 focus:ring-forestGreen/30 focus:border-forestGreen"
    }`;

  return (
    <form className="bg-white mt-4 md:mt-8 py-5 px-5 md:p-8 rounded-xl shadow-sm ring-1 ring-slate-100 w-full">
      <div className="mb-5 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-forestGreen">
          Ticket Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us what&apos;s going on and we&apos;ll get it sorted.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left column - inputs */}
        <div className="flex-1 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700"
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
              placeholder="Brief summary of the issue"
              onChange={handleChange}
              className={fieldClass(!!errors.title)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700"
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
              placeholder="What happened? Steps to reproduce, error messages, anything that helps."
              onChange={handleChange}
              className={`${fieldClass(!!errors.description)} resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Screenshot (optional)
            </label>
            <label
              htmlFor="upload"
              className="mt-1 flex items-center gap-3 border border-dashed border-slate-300 rounded-lg p-4 cursor-pointer hover:border-forestGreen hover:bg-forestGreen/5 transition-colors"
            >
              <FiUploadCloud
                className="text-slate-400 flex-shrink-0"
                size={22}
              />
              <span className="text-sm text-slate-500">
                Click to upload a screenshot, if you have one
              </span>
            </label>
            <input
              type="file"
              id="upload"
              name="upload"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, upload: e.target.files?.[0] ?? null })
              }
              className="hidden"
            />
            {form.upload && (
              <div className="mt-2 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-slate-600 truncate">
                  <FiFile className="flex-shrink-0" />
                  {form.upload.name}
                </span>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, upload: null })}
                  aria-label="Remove attached screenshot"
                  className="text-slate-400 hover:text-slate-600 flex-shrink-0"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column - selects */}
        <div className="flex-1 space-y-5">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-slate-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={form.category}
              required
              onChange={handleChange}
              className={`${fieldClass(!!errors.category)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2364748b%22><path fill-rule=%22evenodd%22 d=%22M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z%22 clip-rule=%22evenodd%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.1rem] pr-9`}
            >
              <option value="">Select a category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Priority
            </label>
            {/*
              Priority as three tappable cards instead of a plain
              <select>. Same underlying value/field — it still sets
              `form.priority` to "Low" | "Medium" | "High" — but since
              priority already gets a color treatment everywhere else
              in the app (list, modal), showing that same color here
              makes the choice itself clearer at a glance.
            */}
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((level) => {
                const isSelected = form.priority === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm({ ...form, priority: level })}
                    className={`text-sm font-medium py-2.5 rounded-md border transition-colors ${
                      isSelected
                        ? level === "High"
                          ? "bg-red-50 border-red-300 text-red-700"
                          : level === "Medium"
                            ? "bg-orange/10 border-orange/40 text-orange"
                            : "bg-slate-100 border-slate-300 text-slate-600"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>
        </div>
      </div>

      {/* Button aligned to the end (right) */}
      <div className="mt-7 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const isValid = validateForm();
            if (isValid) {
              setShowConfirmModal(true);
            }
          }}
          className="bg-forestGreen text-white text-sm md:text-base px-7 py-2.5 rounded-full hover:bg-[#025E50] transition shadow-sm"
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
