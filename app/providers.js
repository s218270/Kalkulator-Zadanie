"use client"; // This is a client component

import { Provider } from "react-redux";
import { store } from "../redux/store"; // Import Redux store

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
