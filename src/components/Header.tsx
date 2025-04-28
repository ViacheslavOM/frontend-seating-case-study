import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { AuthModal } from "./AuthModal";
import { SignInModal } from "./SignInModal";
import { BasketModal } from "./BasketModal";
import avatarImage from "../shared/img/avatar.png";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Login, User } from "@/shared/types";

interface HeaderProps {
  namePub?: string;
  ticketCount: number;
  tickets: {
    seatId?: string;
    ticketTypeId?: string;
    row: string | number;
    seatNumber?: number;
    price?: number;
  }[];
  onRemoveFromCart: (seatId: string) => void;
  loggedInUser: User | null;
  onLogin: (email: string, password: string) => Promise<void>;
  loginData?: Login;
  fetchingCreateLogin: boolean;
}

export function Header({
  namePub,
  ticketCount,
  tickets,
  onRemoveFromCart,
  loggedInUser,
  onLogin,
  loginData,
  fetchingCreateLogin,
}: Readonly<HeaderProps>) {
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openBasketModal = () => setIsBasketModalOpen(true);
  const closeBasketModal = () => setIsBasketModalOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openSignInModal = () => {
    setIsAuthModalOpen(false);
    setIsSignInModalOpen(true);
  };
  const openGuestModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSignIn = async (email: string, password: string) => {
    await onLogin(email, password);
    setIsSignInModalOpen(false);
    setIsAuthModalOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center z-10">
      {isBasketModalOpen && (
        <BasketModal
          tickets={tickets}
          onClose={closeBasketModal}
          onRemove={onRemoveFromCart}
        />
      )}
      {isAuthModalOpen && (
        <AuthModal
          onClose={closeAuthModal}
          onSignInClick={openSignInModal}
          onGuestClick={openGuestModal}
        />
      )}
      {isSignInModalOpen && (
        <SignInModal
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignIn}
          fetchingCreateLogin={fetchingCreateLogin}
        />
      )}

      <div className="max-w-screen-lg w-full p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-auto shrink-0">
          <img src={avatarImage} alt="author" className="h-10 object-cover" />
        </div>

        <div className="text-center flex-1 text-sm md:text-base font-semibold text-zinc-700 truncate">
          Viacheslav Omelnyk {namePub}
        </div>

        <div className="flex items-center gap-3 w-auto shrink-0">
          <div className="relative">
            <button
              className="text-xl p-2 rounded-full hover:bg-zinc-100 active:bg-zinc-200 focus:outline-none"
              onClick={openBasketModal}>
              <FaShoppingBasket />
              {ticketCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {ticketCount}
                </div>
              )}
            </button>
          </div>
          {loginData?.user || loggedInUser ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {loginData?.user.firstName[0].toUpperCase() ??
                    loggedInUser?.firstName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {loginData?.user.firstName ?? loggedInUser?.firstName}
                </span>
                <span className="text-xs text-zinc-500 truncate max-w-[100px]">
                  {loginData?.user.email ?? loggedInUser?.email}
                </span>
              </div>
            </div>
          ) : (
            <button
              className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              onClick={openAuthModal}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
