import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload;
    },
    addTicket(state, action) {
      state.tickets.push(action.payload);
    },
    removeTicket(state, action) {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
  },
});

export const { setTickets, addTicket, removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
