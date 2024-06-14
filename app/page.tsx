"use client";

import Booking from "@/components/booking/Booking";
import Map from "@/components/map/Map";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCorContext } from "@/context/SourceCordContext";
import { useEffect, useState } from "react";
import { DestinationCordinates } from "@/context/destinationCordinates";
import { DiractionDataContext } from "@/context/DiractionDataContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [sourceCoordinates, setSourceCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const [destinationCordinates, setDestinationCordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [directionData, setDirectionData] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude, // Fixed typo here
        });
      },
      (err) => {
        console.error("Error getting user location:", err);
      }
    );
  };

  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCorContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCordinates.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <DiractionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="">
                  <Booking />
                </div>
                <div className="col-span-2 order-first md:order-last">
                  <Map />
                </div>
              </div>
            </DiractionDataContext.Provider>
          </DestinationCordinates.Provider>
        </SourceCorContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
