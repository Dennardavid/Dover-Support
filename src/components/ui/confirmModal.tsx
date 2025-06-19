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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-[90%] sm:w-full max-w-md p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-forestGreen">
          {header}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-forestGreen hover:bg-[#025E50] text-white px-4 py-2 rounded transition text-sm md:text-base"
          >
            {isLoading ? "Processing..." : "Yes, Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
