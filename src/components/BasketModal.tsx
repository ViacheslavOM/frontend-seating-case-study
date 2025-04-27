import { FaTrash } from "react-icons/fa";

interface BasketModalProps {
  tickets: {
    seatId?: string;
    ticketTypeId?: string;
    row: string | number;
    seatNumber?: number;
    price?: number;
  }[];
  onClose: () => void;
  onRemove: (seatId: string) => void;
}

export function BasketModal({
  tickets,
  onClose,
  onRemove,
}: Readonly<BasketModalProps>) {
  const totalPrice = tickets.reduce(
    (sum, ticket) => sum + (ticket.price ?? 0),
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Basket</h2>
          <button
            onClick={onClose}
            className="text-xl hover:text-red-500 focus:outline-none">
            ×
          </button>
        </div>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-center">Your basket is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <li
                  key={ticket.seatId}
                  className="flex justify-between items-center py-2">
                  <div>
                    <div>
                      <span className="font-medium">Row:</span> {ticket.row},{" "}
                      <span className="font-medium">Seat:</span>{" "}
                      {ticket.seatNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(ticket.seatId ?? "")}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full focus:outline-none">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-bold">
                {totalPrice.toFixed(2)} CZK
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
