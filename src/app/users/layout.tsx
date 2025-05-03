import Navigation from "@/components/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`flex flex-row min-h-[100dvh] h-[100dvh] overflow-hidden bg-gray`}
    >
      <Navigation />
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </section>
  );
}
