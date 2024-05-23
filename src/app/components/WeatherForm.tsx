"use client";

import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "@/app/utils/api";

interface WeatherFormProps {
  onSearch: (city: string) => void;
}

interface CitySuggestion {
  key: string;
  name: string;
}

export default function WeatherForm({ onSearch }: WeatherFormProps) {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputText.length > 2) {
      getCitySuggestions(inputText).then((data) =>
        setSuggestions(
          data.map((item) => ({ key: item.Key, name: item.LocalizedName }))
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsRef]);

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setInputText(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  return (
    <div className="flex flex-col items-center py-8 w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-6/12"
      >
        <div className="flex flex-col w-full relative" ref={suggestionsRef}>
          <label htmlFor="city" className="text-primaryColor text-left mb-2">
            City Name
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="p-2 bg-secondaryBg text-white outline-none rounded-sm"
            autoComplete="off"
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => inputText.length > 2 && setShowSuggestions(true)}
          />
          {showSuggestions && (
            <ul
              className="absolute bg-secondaryBg text-white w-full top-20 border border-gray-600 rounded-sm z-10 max-h-40 overflow-y-auto"
              data-testid="city-suggestions"
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.key} // Ensure each item has a unique key
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
