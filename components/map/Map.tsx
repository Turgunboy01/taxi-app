"use client";

import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
// import locImg from "@/public/location.webp"; // Ensure you have this image
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import Markers from "../map/Markers";
import { SourceCorContext } from "@/context/SourceCordContext";
import { DestinationCordinates } from "@/context/destinationCordinates";
import { DiractionDataContext } from "@/context/DiractionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";
const MapPage = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCorContext);

  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinates
  );

  const { directionData, setDirectionData } = useContext(DiractionDataContext);

  console.log(directionData);

  const mapRef = useRef<any>();

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.long, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
        sourceCoordinates.long +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCordinates.long +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        "pk.eyJ1IjoiZGV2c2VuaW9yIiwiYSI6ImNseGNldzIzdDJlNDYya3NhY3hsbnRmY3kifQ.evZwwy4uuKpZ94eiAbbYVA",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setDirectionData(result);
  };

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.long, destinationCordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCoordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="py-5">
        <h2 className="text-[20px] font-semibold">Map</h2>
        {userLocation != null ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={
              "pk.eyJ1IjoiZGV2c2VuaW9yIiwiYSI6ImNseGNldzIzdDJlNDYya3NhY3hsbnRmY3kifQ.evZwwy4uuKpZ94eiAbbYVA"
            }
            initialViewState={{
              longitude: userLocation.long,
              latitude: userLocation.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: "10px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      {/* {directionData.length > 0 && ( */}
        <div className="absolute bottom-[40px] right-[20px] z-30 hidden md:block">
          <DistanceTime />
        </div>
      {/* )} */}
    </div>
  );
};

export default MapPage;
