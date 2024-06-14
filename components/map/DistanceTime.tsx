import { DiractionDataContext } from "@/context/DiractionDataContext";
import React, { useContext } from "react";

const DistanceTime = () => {
  const { directionData, setDirectionData } = useContext(DiractionDataContext);

  return (
    directionData?.routes && (
      <div className="bg-yellow-400 p-3">
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Distance:{" "}
          <span className="font-bold mr-3 text-black">
            {(directionData?.routes[0]?.distance * 0.000621271192).toFixed(2)}{" "}
            Miles
          </span>
          Duraton:
          <span className="font-bold mr-3 text-black">
            {(directionData?.routes[0]?.duration / 60).toFixed(2)} Min
          </span>
        </h2>
      </div>
    )
  );
};

export default DistanceTime;
