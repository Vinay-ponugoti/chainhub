export const CHAIN_CONFIG = {
  ethereum: {
    rpc: [
      `wss://mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      'wss://eth-mainnet.g.alchemy.com/v2/demo'
    ],
    library: 'ethers',
    chainId: 1
  },
  bsc: {
    rpc: [
      'wss://bsc-mainnet.nodereal.io/ws/v1',
      'wss://bsc-ws-node.nariox.org:443'
    ],
    library: 'ethers',
    chainId: 56
  },
  polygon: {
    rpc: [
      'wss://polygon-mainnet.g.alchemy.com/v2/demo',
      'wss://rpc-mainnet.matic.network'
    ],
    library: 'ethers',
    chainId: 137
  },
  avalanche: {
    rpc: [
      'wss://api.avax.network/ext/bc/C/ws',
      'wss://avalanche-c-chain.publicnode.com'
    ],
    library: 'ethers',
    chainId: 43114
  },
  solana: {
    rpc: [
      'wss://api.mainnet-beta.solana.com',
      'wss://solana-mainnet.g.alchemy.com/v2/demo'
    ],
    library: 'solana'
  },
  bitcoin: {
    rpc: [
      'wss://ws.blockchain.info/inv',
      'wss://stream.binance.com:9443/ws'
    ],
    library: 'bitcoin'
  }
};