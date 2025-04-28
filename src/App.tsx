import { Header } from "@/components/Header";
import { EventSidebar } from "@/components/EventSidebar";
import { SeatingGrid } from "@/components/SeatingGrid";
import { BottomCart } from "@/components/BottomCart";
import { FaExclamationTriangle } from "react-icons/fa";
import { Spinner } from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import { useApp } from "./useApp";

import "./App.css";

function App() {
  const {
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
  } = useApp();

  if (eventError || seatsError) {
    return (
      <div className="flex flex-col grow items-center justify-center p-4 text-center">
        <FaExclamationTriangle className="text-4xl text-red-500" />
        <h2 className="text-lg font-semibold text-zinc-700">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500">
          We were unable to load event data. Please try again later.
        </p>
      </div>
    );
  }

  if (isFetchingEvent) {
    return (
      <div className="flex flex-col grow items-center justify-center p-4 text-center">
        <Spinner />
        <p className="text-sm text-zinc-500 mt-4">Loading event details...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-left" />
      <div className="flex flex-col grow">
        <Header
          namePub={eventData?.namePub}
          ticketCount={cart.length}
          tickets={tickets}
          onRemoveFromCart={handleRemoveFromCart}
          loggedInUser={loggedInUser}
          onLogin={handleLogin}
          loginData={loginState.data}
          fetchingCreateLogin={loginState.isLoading}
        />
        <main className="grow flex flex-col justify-center">
          <div className="max-w-screen-lg mx-auto p-4 flex flex-col md:flex-row items-start grow gap-4 w-full">
            <SeatingGrid
              seatsData={seatsData}
              isFetching={isFetchingSeats || loadingCreateOrder}
              onAddToBasket={handleAddToCart}
              onRemoveFromBasket={handleRemoveFromCart}
              isSeatInCart={isSeatInCart}
            />
            <EventSidebar
              headerImageUrl={eventData?.headerImageUrl}
              place={eventData?.place}
              namePub={eventData?.namePub}
              description={eventData?.description}
              dateFrom={eventData?.dateFrom}
              dateTo={eventData?.dateTo}
            />
          </div>
        </main>
        <BottomCart
          totalPrice={totalPrice}
          cartCount={cart.length}
          eventId={eventData?.eventId ?? ""}
          tickets={tickets}
          onOrderSuccess={clearCart}
          loggedInUser={loggedInUser}
          onLogin={handleLogin}
          setLoadingCreateOrder={setLoadingCreateOrder}
          fetchingCreateLogin={loginState.isLoading}
        />
      </div>
    </>
  );
}

export default App;
