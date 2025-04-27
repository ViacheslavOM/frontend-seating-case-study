import { Seat } from "@/components/Seat";
import { Spinner } from "./Spinner";
import type { EventSeats } from "@/shared/types";

interface SeatingGridProps {
  seatsData?: EventSeats;
  isFetching: boolean;
  onAddToBasket: (seatId: string) => void;
  onRemoveFromBasket: (seatId: string) => void;
  isSeatInCart: (seatId: string) => boolean;
}

export function SeatingGrid({
  seatsData,
  isFetching,
  onAddToBasket,
  onRemoveFromBasket,
  isSeatInCart,
}: Readonly<SeatingGridProps>) {
  if (!seatsData) return null;

  const { seatRows, ticketTypes } = seatsData;
  const ticketTypeMap = Object.fromEntries(
    ticketTypes.map((type) => [type.id, type])
  );
  const maxSeatsInRow = Math.max(...seatRows.map((row) => row.seats.length));

  if (isFetching) {
    return (
      <div className="flex flex-col grow items-center justify-center p-4 text-center">
        <Spinner />
      </div>
    );
  }

  const renderSeatRow = (row: (typeof seatRows)[number], index: number) => {
    const sortedSeats = [...row.seats].sort((a, b) => a.place - b.place);
    const seatsByPlace = new Map(sortedSeats.map((seat) => [seat.place, seat]));

    return (
      <div
        key={row.seatRow}
        className={`flex items-center gap-4 py-2 ${
          index !== seatRows.length - 1 ? "border-b border-zinc-300" : ""
        }`}>
        <div className="w-8 text-sm font-medium text-right text-zinc-500 shrink-0">
          {row.seatRow}
        </div>

        <div className="flex flex-1 justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: maxSeatsInRow }, (_, i) => {
              const place = i + 1;
              const seat = seatsByPlace.get(place);

              return seat ? (
                <Seat
                  key={seat.seatId}
                  seatId={seat.seatId}
                  place={seat.place}
                  ticketType={ticketTypeMap[seat.ticketTypeId]}
                  isInCart={isSeatInCart(seat.seatId)}
                  onAddToBasket={onAddToBasket}
                  onRemoveFromBasket={onRemoveFromBasket}
                />
              ) : (
                <div
                  key={`placeholder-${place}`}
                  className="size-8 flex items-center justify-center rounded-full bg-zinc-400 text-zinc-500 text-xs font-medium cursor-not-allowed"
                  title={`Seat ${place} not available`}>
                  {place}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-md grow flex flex-col p-3 shadow-sm overflow-auto">
      {/* Stage */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 shrink-0" />
        <div className="flex-1 rounded py-2 bg-zinc-200 bg-opacity-60">
          <div className="text-center text-sm font-semibold text-zinc-600">
            STAGE
          </div>
        </div>
      </div>

      {/* Seats */}
      {seatRows.map(renderSeatRow)}

      {/* Legend */}
      <div className="mt-6 p-4 bg-zinc-100 rounded-md shadow-sm">
        <h4 className="text-lg font-semibold text-zinc-600">Seat Type</h4>
        <div className="flex gap-4 mt-2">
          {[
            { color: "bg-yellow-500", label: "VIP" },
            { color: "bg-zinc-200", label: "Regular" },
            { color: "bg-zinc-400", label: "Not available" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${color}`} />
              <span className="text-sm text-zinc-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
