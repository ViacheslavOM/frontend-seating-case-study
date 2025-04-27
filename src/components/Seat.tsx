import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React, { useMemo } from "react";

interface TicketType {
  name: string;
  price: number;
}

interface SeatProps extends React.HTMLAttributes<HTMLDivElement> {
  seatId: string;
  place: number;
  ticketType: TicketType;
  isInCart: boolean;
  onAddToBasket: (seatId: string) => void;
  onRemoveFromBasket: (seatId: string) => void;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (
    {
      seatId,
      place,
      ticketType,
      isInCart,
      onAddToBasket,
      onRemoveFromBasket,
      className,
      ...props
    },
    ref
  ) => {
    const seatColor = useMemo(() => {
      if (isInCart) return "bg-green-200";
      if (ticketType.name === "VIP ticket") return "bg-yellow-500";
      return "bg-zinc-200";
    }, [isInCart, ticketType.name]);

    const handleClick = () => {
      isInCart ? onRemoveFromBasket(seatId) : onAddToBasket(seatId);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            {...props}
            title={`Seat ${place}`}
            className={cn(
              "size-8 rounded-full hover:bg-opacity-80 transition-colors flex items-center justify-center text-xs text-zinc-600 font-medium cursor-pointer",
              seatColor,
              className
            )}>
            {place}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-60 space-y-2">
          <div>
            <h4 className="text-sm font-semibold text-zinc-700">
              Seat #{place}
            </h4>
            <p className="text-xs text-zinc-500">
              {ticketType.name} - {ticketType.price} CZK
            </p>
          </div>

          <footer className="flex flex-col">
            <Button
              variant={isInCart ? "destructive" : "default"}
              size="sm"
              onClick={handleClick}>
              {isInCart ? "Remove from cart" : "Add to cart"}
            </Button>
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);

Seat.displayName = "Seat";
