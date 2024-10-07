import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./features/calculatorSlice";

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});
