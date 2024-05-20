"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TemperatureContextProps {
  isCelsius: boolean;
  toggleUnit: (toCelsius: boolean) => void;
}

const TemperatureContext = createContext<TemperatureContextProps | undefined>(
  undefined
);

export const TemperatureProvider = ({ children }: { children: ReactNode }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = (toCelsius: boolean) => {
    setIsCelsius(toCelsius);
  };

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error("useTemperature must be used within a TemperatureProvider");
  }
  return context;
};
