import { configureStore } from "@reduxjs/toolkit";
import { hotelReducer } from "./HotelSlicer";

export const Store=configureStore({
    reducer:{
        counter: hotelReducer,
    }
})