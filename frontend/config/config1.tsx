import { http, createConfig } from '@wagmi/core'
import { sepolia, arbitrumSepolia } from '@wagmi/core/chains'

export const config1 = createConfig({
  chains: [sepolia, arbitrumSepolia],
  transports: {
      [sepolia.id]: http(),
      [arbitrumSepolia.id]: http(),
  },
})