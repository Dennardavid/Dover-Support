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
    <section className="mt-7 flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold text-forestGreen">
        {description}
      </h1>
      <p className="text-forestGreen font-medium mt-3 text-xl">
        {message}
        <span className=" text-orange">{username}</span>
      </p>
    </section>
  );
}
