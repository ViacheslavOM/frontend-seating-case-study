import { useState, useCallback, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import type { User } from "./shared/types";
import {
  useGetEventQuery,
  useGetSeatQuery,
  useCreateLoginMutation,
} from "./store/api";

export const useApp = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [loadingCreateOrder, setLoadingCreateOrder] = useState(false);

  const {
    data: eventData,
    isFetching: isFetchingEvent,
    error: eventError,
  } = useGetEventQuery();

  const {
    data: seatsData,
    isFetching: isFetchingSeats,
    error: seatsError,
  } = useGetSeatQuery(
    { eventId: eventData?.eventId ?? "" },
    { skip: !eventData }
  );

  const [createLogin, loginState] = useCreateLoginMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await createLogin({ email, password }).unwrap();
      setLoggedInUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Sign-in successful!");
    } catch {
      toast.error("Sign-in failed. Please try again.");
    }
  };

  const handleAddToCart = useCallback((seatId: string) => {
    setCart((prev) => [...prev, seatId]);
  }, []);

  const handleRemoveFromCart = useCallback((seatId: string) => {
    setCart((prev) => prev.filter((id) => id !== seatId));
  }, []);

  const isSeatInCart = useCallback(
    (seatId: string) => cart.includes(seatId),
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const findSeat = useCallback(
    (seatId: string) => {
      return seatsData?.seatRows
        .flatMap((row) => row.seats)
        .find((seat) => seat.seatId === seatId);
    },
    [seatsData]
  );

  const findTicketType = useCallback(
    (ticketTypeId?: string) => {
      return seatsData?.ticketTypes.find((type) => type.id === ticketTypeId);
    },
    [seatsData]
  );

  const tickets = useMemo(
    () =>
      cart.map((seatId) => {
        const seat = findSeat(seatId);

        const ticketType = findTicketType(seat?.ticketTypeId);
        const seatRow = seatsData?.seatRows.find((row) =>
          row.seats.some((s) => s.seatId === seatId)
        );

        return {
          seatId: seat?.seatId,
          ticketTypeId: seat?.ticketTypeId,
          row: seatRow?.seatRow ?? "Unknown Row",
          seatNumber: seat?.place,
          price: ticketType?.price,
        };
      }),
    [cart, findSeat, findTicketType, seatsData]
  );

  const totalPrice = useMemo(() => {
    return cart.reduce((total, seatId) => {
      const seat = findSeat(seatId);
      const ticketType = seat ? findTicketType(seat.ticketTypeId) : null;
      return ticketType ? total + ticketType.price : total;
    }, 0);
  }, [cart, findSeat, findTicketType]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return {
    totalPrice,
    tickets,
    cart,
    loggedInUser,
    loginState,
    handleAddToCart,
    handleLogin,
    handleRemoveFromCart,
    eventData,
    eventError,
    isFetchingEvent,
    isFetchingSeats,
    seatsData,
    seatsError,
    isSeatInCart,
    clearCart,
    setLoadingCreateOrder,
    loadingCreateOrder,
  };
};
