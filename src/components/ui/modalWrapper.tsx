"use client";

import { IoClose } from "react-icons/io5";

export default function ModalWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-forestGreen rounded-full p-2 hover:bg-[#025E50] transition-all delay-100 text-white"
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
