import { Chain } from '@wagmi/core'

export const thetatestnet = {
    id: 365,
    name: 'Theta',
    network: 'theta',
    nativeCurrency: {
        decimals: 18,
        name: 'Theta',
        symbol: 'TFUEL',
    },
    rpcUrls: {
        public: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
        default: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    },
    blockExplorers: {
        etherscan: { name: 'Theta Explorer', url: 'https://testnet-explorer.thetatoken.org/' },
        default: { name: 'Theta Explorer', url: 'https://testnet-explorer.thetatoken.org/' },
    }
} as const satisfies Chain