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
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-lg font-semibold mb-4 text-forestGreen">
          {header}
        </h3>
        <p className="mb-4 text-gray-600">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-forestGreen hover:bg-[#025E50] text-white px-4 py-2 rounded transition"
          >
            {isLoading ? "Processing..." : "Yes, Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
