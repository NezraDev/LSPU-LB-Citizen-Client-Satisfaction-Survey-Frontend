interface TicketInfoProps {
  ticketCode: string;
  date: string;
  timeIn: string;
  timeOut: string;
  onTicketCodeChange: (value: string) => void;
}

export default function TicketInfo({
  ticketCode,
  date,
  timeIn,
  timeOut,
  onTicketCodeChange,
}: TicketInfoProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Code
          </label>
          <input
            type="text"
            value={ticketCode}
            onChange={(e) => onTicketCodeChange(e.target.value)}
            maxLength={6}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter 6‑digit code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="text"
            readOnly
            value={date}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time In
          </label>
          <input
            type="text"
            readOnly
            value={timeIn}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Out
          </label>
          <input
            type="text"
            readOnly
            value={timeOut}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}
