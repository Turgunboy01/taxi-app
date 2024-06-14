import { createContext, useContext } from "react";

export const DestinationCordinates = createContext<{
  destinationCordinates: { lat: number; lng: number } | null;
  setDestinationCordinates: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
} | null>(null);

export const useDestinationCordinates = () => useContext(DestinationCordinates);
