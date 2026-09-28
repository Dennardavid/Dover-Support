export default function PageHeader({
  description,
  message,
  username,
}: {
  description: string;
  message: string;
  username: string | null | undefined;
}) {
  return (
    <section className="mt-10 md:mt-2 flex flex-col gap-1 md:gap-2 pb-4 md:pb-5 border-b border-slate-200">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forestGreen">
        {description}
      </h1>
      {message && (
        <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium">
          {message}
          <span className="text-orange"> {username}</span>
        </p>
      )}
    </section>
  );
}
