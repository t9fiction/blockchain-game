"use client";

import React, { useState, useEffect } from "react";
import { writeContract, watchContractEvent } from "@wagmi/core";
import { GUESSING_GAME_ABI, SEPOLIA_GUESSING_GAME_ADDRESS } from "@/contract";
import { useAccount } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import ConnectButton from "./sub-components/ConnectButton";
import { GameResultEvent } from "@/types/events";
import { sepoliaConfig } from "@/config/allConfigs";

const Hero: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{
    guess: number;
    reward: bigint;
    winType: string;
  } | null>(null);

  const publicClient = getPublicClient(sepoliaConfig);
  const { address, chainId, isConnected } = useAccount();
  

 

  // Set up event listener
  useEffect(() => {
    if (!isConnected) return;

    const unwatch = watchContractEvent(sepoliaConfig, {
      address: SEPOLIA_GUESSING_GAME_ADDRESS,
      abi: GUESSING_GAME_ABI,
      eventName: "GameResult",
      onLogs: (logs) => {
        
        const log = logs[0] as unknown as GameResultEvent;
        const eventData = log.args; 

        if (!eventData) return;

        const { player, guess, reward, winType } = eventData;

        // Only process events for the current player
        if (player.toLowerCase() === address?.toLowerCase()) {
          const messages = {
            EXACT:
              "🎉 Congratulations! Perfect guess! You won 1000 LMNG tokens!",
            CLOSE: "👏 Close guess! You won 500 LMNG tokens!",
            NONE: "❌ Not quite right. Try again!",
          };
          alert(messages[winType as keyof typeof messages]);

          // Show toast notification
          // toast(messages[winType as keyof typeof messages], {
          //   duration: 5000,
          //   position: "top-center",
          // });

          // Update last result state
          setLastResult({
            guess: Number(guess),
            reward,
            winType: winType as string,
          });
        }
      },
    });

    return () => {
      unwatch();
    };
  }, [address, isConnected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    setValue(inputValue);

    if (inputValue < 1 || inputValue > 10) {
      setError("Please enter a number between 1 and 10.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    } else if (chainId !== 11155111 && chainId !== 421614) {
      setError("Please switch to Sepolia Testnet or Arbitrum Sepolia Testnet");
      return;
    }

    if (value === undefined || value < 1 || value > 10) {
      setError("Please enter a valid number between 1 and 10.");
      return;
    }

    try {
      toast.loading("Submitting your guess...");

      const hash = await writeContract(sepoliaConfig, {
        abi: GUESSING_GAME_ABI,
        address: SEPOLIA_GUESSING_GAME_ADDRESS,
        functionName: "guessNumber",
        args: [value],
      });

      console.log("Transaction Hash:", hash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log("Transaction Mined:", receipt);

      toast.dismiss();
      setValue(undefined); // Reset input after successful submission
    } catch (err) {
      console.error("Error:", err);
      setError("Transaction failed");
      toast.dismiss();
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="fixed flex flex-col my-12 py-12 items-center justify-center w-full h-screen">
      <Toaster />
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
        {isConnected ? (
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        ) : (
          <div className="mt-4 w-full bg-blue-500 border border-primary text-white font-medium  px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            <ConnectButton />
          </div>
        )}

        {lastResult && lastResult.winType !== "NONE" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-green-700">
              {lastResult.winType === "EXACT"
                ? "🎉 Perfect guess! You won 1000 LMNG tokens!"
                : "👏 Close guess! You won 500 LMNG tokens!"}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Hero;
