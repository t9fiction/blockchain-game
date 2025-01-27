'use client'
import React, { useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useAppKit } from '@reown/appkit/react';
import { useDisconnect } from 'wagmi';

export default function ConnectButton() {
    const { open } = useAppKit();
    const { isConnected } = useAppKitAccount();
    const { disconnect } = useDisconnect();
    
    useEffect(() => {
        disconnect();
      }, []);

    const handleOpen = () => {
        open(); // Opens the AppKit interface or modal
    };

    return (
        <div>
            {!isConnected ? (
                <div
                    onClick={handleOpen}
                    className="text-secondary hover:text-gray-900 uppercase cursor-pointer ease-in-out duration-300 rounded-sm py-2 px-4 border-foreground mx-auto flex items-center justify-center"
                >
                    Connect
                </div>
            ) : (
                <div className="text-secondary border border-spacing-1 border-foreground">
                    {/* @ts-expect-error This is a known issue with the appkit-button type definition */}
                    <appkit-button />
                </div>
            )}
        </div>
    );
}
