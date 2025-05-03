export default function TicketForm() {
  return (
    <form action="" className="bg-white mt-8 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-3xl font-bold mb-6 text-[#1b1b1b]">Ticket Form</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label
              htmlFor="subject"
              className="block text-base font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              id="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen resize-none"
            />
          </div>
        </div>

        {/* Right column - selects */}
        <div className="flex-1 space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Network">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-base font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-forestGreen"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Button aligned to the end (right) */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-forestGreen text-white px-6 py-2 rounded-full hover:bg-orange transition"
        >
          Create
        </button>
      </div>
    </form>
  );
}
