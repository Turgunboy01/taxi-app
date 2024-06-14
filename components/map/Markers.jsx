import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import { UserLocationContext } from "@/context/UserLocationContext";
// import {} from '@/context/SourceCordContext'
import locImg from "@/public/location.webp"; // Ensure you have this image
import { SourceCorContext } from "@/context/SourceCordContext";
import { DestinationCordinates } from "@/context/destinationCordinates";
const Markers = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCorContext);

  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinates
  );
  console.log(sourceCoordinates, "cor");

  return (
    <div>
      {" "}
      <Marker
        longitude={userLocation.lng}
        latitude={userLocation.lat}
        anchor="bottom"
      >
        <img src={locImg.src} alt="Location Pin" className="w-10 h-10" />
      </Marker>
      {/* source markers  */}
      {sourceCoordinates != null ? (
        <Marker
          longitude={sourceCoordinates.long}
          latitude={sourceCoordinates.lat}
          anchor="bottom"
        >
          <img src={locImg.src} alt="Location Pin" className="w-10 h-10" />
        </Marker>
      ) : null}
      {/* destination markers  */}
      {destinationCordinates != null ? (
        <Marker
          longitude={destinationCordinates.long}
          latitude={destinationCordinates.lat}
          anchor="bottom"
        >
          <img src={locImg.src} alt="Location Pin" className="w-10 h-10" />
        </Marker>
      ) : null}
    </div>
  );
};

export default Markers;
