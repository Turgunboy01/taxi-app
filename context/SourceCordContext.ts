// import { createContext } from "react";

// export const SourceCorContext = createContext(null);

import { createContext, useContext } from "react";

export const SourceCorContext = createContext<{
  sourceCoordinates: { lat: number; lng: number } | null;
  setSourceCoordinates: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
} | null>(null);

export const useSoruceCordinates = () => useContext(SourceCorContext);
