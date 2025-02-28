/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    BLOCKCHAIN_API_KEY: process.env.BLOCKCHAIN_API_KEY,
    NEXT_PUBLIC_ETHERSCAN_API_KEY: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    NEXT_PUBLIC_BSCSCAN_API_KEY: process.env.NEXT_PUBLIC_BSCSCAN_API_KEY,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  }
};

module.exports = nextConfig;
