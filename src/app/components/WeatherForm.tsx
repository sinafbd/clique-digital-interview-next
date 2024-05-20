"use client";

import { useState, FormEvent } from "react";

interface WeatherFormProps {
  onSearch: (city: string) => void;
}

export default function WeatherForm({ onSearch }: WeatherFormProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 w-full">
      <form onSubmit={handleSubmit} className="flex justify-center mb-4 w-6/12">
        <div className="flex flex-col w-full">
          <label
            htmlFor="city-name"
            className="text-primaryColor text-left mb-2"
          >
            City Name
          </label>
          <input
            id="city-name"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 bg-secondaryBg text-white outline-none rounded-sm"
          />
          <button
            type="submit"
            className="bg-primaryColor text-white p-2 rounded-r-md"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
