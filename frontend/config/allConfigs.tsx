import { http, createConfig } from '@wagmi/core'
import { sepolia, arbitrumSepolia } from '@wagmi/core/chains'

export const sepoliaConfig = createConfig({
  chains: [sepolia],
  transports: {
      [sepolia.id]: http(),
  },
})

export const arbSepoliaConfig = createConfig({
  chains: [arbitrumSepolia],
  transports: {
      [arbitrumSepolia.id]: http(),
  },
})