"use client";
import React, { useContext, useState } from "react";
import { CarsList } from "@/public/data.js";
import Image from "next/image";
import { DiractionDataContext } from "@/context/DiractionDataContext";
const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DiractionDataContext);

  const getCoast = (chargers: any) => {
    return (
      chargers *
      directionData.routes[0].distance *
      0.000621271192
    ).toFixed(2);
  };

  return (
    <div>
      <h1 className="font-semibold">Select Cars</h1>
      <div className="grid grid-cols-3 md:grid-cols-2  lg:grid-cols-3 m-1 p-2">
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`p-2 m-2 border hover:border-yellow-400 cursor-pointer ${
              index == selectedCar ? "border-yellow-400" : ""
            }    `}
            onClick={() => setSelectedCar(index)}
          >
            <Image
              src={item.img}
              alt="ote"
              className="w-full object-contain h-[60px]"
              width={75}
              height={90}
            />
            <div className="flex justify-between">
              <h2 className="text-gray-400">{item.name}</h2>
              {directionData?.routes ? (
                <span className="text-[#222]">${getCoast(item.chargers)}</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
