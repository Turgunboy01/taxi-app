"use client";
import React, { useEffect, useState } from "react";
import AutoComplateAdress from "./AutoComplateAdress";
import Cars from "./Cars";

const Booking: React.FC = () => {
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    // Komponent mijozda o'rnatilgandan keyin bajariladi
    setScreenHeight(window.innerHeight * 0.72);
  }, []); // Bo'sh bog'lanish - faqat bir marta ishlaydi

  return (
    <div className="p-5">
      <h2 className="text-[22px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeight }}
      >
        <AutoComplateAdress />
        <div className="pt-[40px]">
          <Cars />
        </div>
      </div>
    </div>
  );
};

export default Booking;
