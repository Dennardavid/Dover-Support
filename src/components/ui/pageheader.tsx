import { BsPerson } from "react-icons/bs";

export default function PageHeader({ description }: { description: string }) {
  return (
    <section className="mt-7 flex justify-between items-center">
      <h1 className="text-4xl font-extrabold text-forestGreen">
        {description}
      </h1>
      <button className="mr-5 bg-forestGreen flex items-center justify-center p-3 rounded-full hover:cursor-pointer" aria-label="profile">
        <BsPerson color="white" fontSize={30} />
      </button>
    </section>
  );
}
