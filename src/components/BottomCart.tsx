import { useEffect, useState } from "react";
import { AuthModal } from "./AuthModal";
import { SignInModal } from "./SignInModal";
import { ProceedAsGuestModal } from "./ProceedAsGuestModal";
import { useCreateOrderMutation, useGetSeatQuery } from "@/store/api";
import { toast } from "react-hot-toast";
import { Checkout } from "./Checkout";
import type { User } from "@/shared/types";

interface BottomCartProps {
  totalPrice: number;
  cartCount: number;
  eventId: string;
  tickets: {
    seatId?: string;
    ticketTypeId?: string;
    row: string | number;
    seatNumber?: number;
    price?: number;
  }[];
  onOrderSuccess: () => void;
  loggedInUser: User | null;
  onLogin: (email: string, password: string) => Promise<void>;
  setLoadingCreateOrder: (value: boolean) => void;
  fetchingCreateLogin: boolean;
}

export function BottomCart({
  totalPrice,
  cartCount,
  eventId,
  tickets,
  onOrderSuccess,
  loggedInUser,
  onLogin,
  setLoadingCreateOrder,
  fetchingCreateLogin,
}: Readonly<BottomCartProps>) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { refetch } = useGetSeatQuery({ eventId });

  const handleCheckout = async () => {
    if (loggedInUser) {
      try {
        await createOrder({
          eventId,
          tickets: tickets.map((item) => ({
            ticketTypeId: item?.ticketTypeId ?? "",
            seatId: item?.seatId ?? "",
          })),
          user: loggedInUser,
        }).unwrap();
        onOrderSuccess();
        toast.success("Order created successfully!");
        refetch();
      } catch {
        toast.error("Failed to create order. Please try again.");
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    await onLogin(email, password);
    setShowSignInModal(false);
    setShowAuthModal(false);
  };

  const handleGuestSubmit = async (user: User) => {
    try {
      await createOrder({
        eventId,
        tickets: tickets.map((item) => ({
          ticketTypeId: item?.ticketTypeId ?? "",
          seatId: item?.seatId ?? "",
        })),
        user,
      }).unwrap();
      setShowGuestModal(false);
      setShowAuthModal(false);
      onOrderSuccess();
      toast.success("Order created successfully!");
      refetch();
    } catch {
      toast.error("Failed to create order. Please try again.");
    }
  };

  useEffect(() => {
    setLoadingCreateOrder(isLoading);
  }, [isLoading, setLoadingCreateOrder]);

  return (
    <>
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSignInClick={() => {
            setShowAuthModal(false);
            setShowSignInModal(true);
          }}
          onGuestClick={() => {
            setShowAuthModal(false);
            setShowGuestModal(true);
          }}
          showProceedButton
        />
      )}
      {showSignInModal && (
        <SignInModal
          onClose={() => setShowSignInModal(false)}
          onSignIn={handleSignIn}
          fetchingCreateLogin={fetchingCreateLogin}
        />
      )}
      {showGuestModal && (
        <ProceedAsGuestModal
          onClose={() => setShowGuestModal(false)}
          onSubmit={handleGuestSubmit}
        />
      )}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
          <div className="flex flex-col">
            <span>Total for {cartCount} tickets</span>
            <span className="text-2xl font-semibold">{totalPrice} CZK</span>
          </div>
          <Checkout
            disabled={cartCount === 0 || isLoading}
            onClick={handleCheckout}
          />
        </div>
      </nav>
    </>
  );
}
