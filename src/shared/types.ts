export interface EventData {
  eventId: string;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: string;
  dateTo: string;
  headerImageUrl: string;
  place: string;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface Seat {
  seatId: string;
  place: number;
  ticketTypeId: string;
}

interface SeatRow {
  seatRow: number;
  seats: Seat[];
}

export interface EventSeats {
  ticketTypes: TicketType[];
  seatRows: SeatRow[];
}

export interface Login {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Ticket {
  ticketTypeId: string;
  seatId: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface TicketPurchaseRequest {
  eventId: string;
  tickets: Ticket[];
  user: User;
}

export interface TicketPurchaseResponse {
  message: string;
  orderId: string;
  tickets: Ticket[];
  user: User;
  totalAmount: number;
}
