"use client";

import { createContext, useContext, useState } from "react";
import { RANGES } from "@/lib/data";

const RangeContext = createContext({ range: 30, setRange: () => {} });

export function RangeProvider({ children }) {
  const [range, setRange] = useState(RANGES[1]);
  return (
    <RangeContext.Provider value={{ range, setRange }}>
      {children}
    </RangeContext.Provider>
  );
}

export function useRange() {
  return useContext(RangeContext);
}
