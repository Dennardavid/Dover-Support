export default function Loading() {
  return (
    <div className="mt-10 text-center text-slate-500">
      <div className="mt-4 flex justify-center space-x-2">
        <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce [animation-delay:-.2s]"></div>
        <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce [animation-delay:-.4s]"></div>
      </div>
    </div>
  );
}
