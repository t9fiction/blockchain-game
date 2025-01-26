"use client";

import React, { useState } from "react";
import { writeContract } from "@wagmi/core";
import { config1 } from "@/config/config1";
import { GUESSING_GAME_ABI, SEPOLIA_GUESSING_GAME_ADDRESS } from "@/contract";

const Hero: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const result = await writeContract(config1, {
    abi: GUESSING_GAME_ABI,
    address: SEPOLIA_GUESSING_GAME_ADDRESS,
    functionName: "guessNumber",
    args: [value],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    setValue(inputValue);

    if (inputValue < 1 || inputValue > 10) {
      setError("Please enter a number between 1 and 10.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value === undefined || value < 1 || value > 10) {
      setError("Please enter a valid number between 1 and 10.");
      return;
    }

    // Process the valid value here
    alert(`Submitted value: ${value}`);
  };

  return (
    <div className="fixed flex flex-col my-12 py-12 items-center justify-center w-full h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-primary border-2 border-secondary p-8 rounded-lg shadow-md max-w-sm w-full"
      >
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Guess and earn LMNG Tokens
        </h1>
        <label
          htmlFor="numberInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter a number (1-10):
        </label>
        <input
          id="numberInput"
          type="number"
          min="1"
          max="10"
          value={value ?? ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Hero;
