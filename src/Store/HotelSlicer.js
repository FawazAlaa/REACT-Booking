import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelItems: [], // For display if needed
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const hotel = action.payload;

      // Get current logged-in user
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (!loggedUser) {
        console.warn("No user is currently logged in.");
        return;
      }

      // Add booking to state (optional, for UI)
      state.hotelItems.push(hotel);

      // Add booking to the logged-in user's object
      const updatedUsers = allUsers.map((user) => {
        if (user.email === loggedUser.email) {
          user.hotelsbooked = user.hotelsbooked || [];
          user.hotelsbooked.push(hotel);
          // Also update the loggedUser object in localStorage
          localStorage.setItem("loggedUser", JSON.stringify(user));
          return user;
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    },

    removeBooking: (state, action) => {
      const hotelId = action.payload;

      // Get current logged-in user
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (!loggedUser) {
        console.warn("No user is currently logged in.");
        return;
      }

      state.hotelItems = state.hotelItems.filter((h) => h.id !== hotelId);

      const updatedUsers = allUsers.map((user) => {
        if (user.email === loggedUser.email) {
          user.hotelsbooked = (user.hotelsbooked || []).filter(
            (h) => h.id !== hotelId
          );
          localStorage.setItem("loggedUser", JSON.stringify(user));
          return user;
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    },
  },
});

export const { addBooking, removeBooking } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
