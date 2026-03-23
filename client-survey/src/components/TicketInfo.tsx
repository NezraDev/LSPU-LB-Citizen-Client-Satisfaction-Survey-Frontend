import React from "react";

interface TicketInfoProps {
  ticketCode: string;
  date: string;
  timeIn: string;
  timeOut: string;
  onTicketCodeChange: (value: string) => void;
  error?: string; // error message for ticket code
}

const TicketInfo: React.FC<TicketInfoProps> = ({
  ticketCode,
  date,
  timeIn,
  timeOut,
  onTicketCodeChange,
  error,
}) => {
  // Dynamic input class – add red border if error exists
  const inputClasses = `mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={ticketCode}
            onChange={(e) => onTicketCodeChange(e.target.value)}
            className={inputClasses}
            placeholder="Enter 6-digit ticket code"
          />
          {/* Error message displayed directly below input */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
};

export default TicketInfo;
