import type {
  EventData,
  EventSeats,
  Login,
  LoginRequest,
  TicketPurchaseResponse,
  TicketPurchaseRequest,
} from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nfctron-frontend-seating-case-study-2024.vercel.app",
  }),
  endpoints: (builder) => ({
    getEvent: builder.query<EventData, void>({
      query: () => "/event",
    }),
    getSeat: builder.query<EventSeats, { eventId: string }>({
      query: ({ eventId }) => ({ url: "/event-tickets", params: { eventId } }),
    }),
    createLogin: builder.mutation<Login, LoginRequest>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    createOrder: builder.mutation<
      TicketPurchaseResponse,
      TicketPurchaseRequest
    >({
      query: (body) => ({ url: "/order", method: "POST", body }),
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetSeatQuery,
  useCreateLoginMutation,
  useCreateOrderMutation,
} = api;
