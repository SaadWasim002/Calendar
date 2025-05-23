import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadEvents } from "../../utils/storage";

const initialState = {
  events: loadEvents(),
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const event = { id: nanoid(), ...action.payload };
      state.events.push(event);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
    moveEvent: (state, action) => {
      const { id, date } = action.payload;
      const event = state.events.find((e) => e.id === id);
      if (event) event.date = date;
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, moveEvent } = eventSlice.actions;
    
export default eventSlice.reducer;
