"use client";
import { SourceCorContext } from "@/context/SourceCordContext";
import { DestinationCordinates } from "@/context/destinationCordinates";
import React, { useContext, useEffect, useState } from "react";

const session_token = `5ccce4a4-ab0a-4a7c-943d-580e55542363`;

const AutoComplateAdress = () => {
  const [source, setSource] = useState<string>("");
  const [destinations, setDestinations] = useState<string>("");
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationsChange, setDestinationsChange] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<any[]>([]);

  // const [sourceCordinates, setSourceCordinates] = useState<any>();
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCorContext);

  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinates
  );
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (sourceChange || destinationsChange) {
        getAddress();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [source, destinations, sourceChange, destinationsChange]);

  const getAddress = async () => {
    const query = sourceChange ? source : destinations;
    const res = await fetch(`/api/search-adress?q=` + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressList(result);
  };

  const onSourceAddessClick = async (item) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapbox_id}?session_token=[GENERATED-UUID]&access_token=pk.eyJ1IjoiZGV2c2VuaW9yIiwiYSI6ImNseGNldzIzdDJlNDYya3NhY3hsbnRmY3kifQ.evZwwy4uuKpZ94eiAbbYVA`
    );

    const result = await res.json();
    setSourceCoordinates({
      long: result?.features[0].geometry.coordinates[0],
      lat: result?.features[0].geometry.coordinates[1],
    });
  };
  const onAddessClick = async (item) => {
    setDestinations(item.full_address);
    setAddressList([]);
    setDestinationsChange(false);
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapbox_id}?session_token=[GENERATED-UUID]&access_token=pk.eyJ1IjoiZGV2c2VuaW9yIiwiYSI6ImNseGNldzIzdDJlNDYya3NhY3hsbnRmY3kifQ.evZwwy4uuKpZ94eiAbbYVA`
    );

    const result = await res.json();
    setDestinationCordinates({
      long: result?.features[0].geometry.coordinates[0],
      lat: result?.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
            setDestinationsChange(false);
          }}
          className="bg-[#fff] outline-none border-[1px] rounded-md w-full focus:border-yellow-300"
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                onClick={() => onSourceAddessClick(item)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-4 relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          value={destinations}
          onChange={(e) => {
            setDestinations(e.target.value);
            setDestinationsChange(true);
            setSourceChange(false);
          }}
          className="bg-[#fff] outline-none border-[1px] rounded-md w-full focus:border-yellow-300"
        />
        {addressList?.suggestions && destinationsChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList?.suggestions?.map((item: any, index: number) => (
              <h2
                key={index}
                onClick={() => onAddessClick(item)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoComplateAdress;
