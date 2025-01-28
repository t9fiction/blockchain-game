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
        <div className='relative'>
            <div
                style={{ minWidth: '150px' }} // Set a fixed width for consistency
                className="text-primary hover:text-secondary uppercase cursor-pointer ease-in-out duration-300 rounded-sm py-2 px-4 mx-auto flex items-center justify-center"
            >
                {!isConnected ? (
                    <div onClick={handleOpen}>
                        Connect
                    </div>
                ) : (
                    <div className='text-secondary'>
                        {/* @ts-expect-error This is a known issue with the appkit-button type definition */}
                        <appkit-button />
                    </div>
                )}
            </div>
        </div>
    );
}
