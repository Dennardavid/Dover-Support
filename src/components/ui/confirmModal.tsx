"use client";

export default function ConfirmModal({
  message,
  header,
  onCancel,
  onConfirm,
  isLoading,
}: {
  header: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-[90%] sm:w-full max-w-md p-6 rounded-xl shadow-xl text-center">
        <h3 className="text-base md:text-lg font-semibold mb-2 text-forestGreen">
          {header}
        </h3>
        <p className="text-sm md:text-base text-slate-500 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row-reverse justify-center gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-forestGreen hover:bg-[#025E50] text-white px-4 py-2.5 rounded-lg transition text-sm md:text-base font-medium disabled:opacity-60"
          >
            {isLoading ? "Processing..." : "Yes, Confirm"}
          </button>
          <button
            onClick={onCancel}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg transition text-sm md:text-base font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
