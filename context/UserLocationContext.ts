import { createContext, useContext } from "react";

export const UserLocationContext = createContext<{
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
} | null>(null);

export const useUserLocation = () => useContext(UserLocationContext);
