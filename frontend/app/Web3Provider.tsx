"use client"

import "@rainbow-me/rainbowkit/styles.css"
import type { PropsWithChildren } from "react"

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { arbitrumSepolia } from "viem/chains"
import { parseAbi } from "viem"



// const localChain = {
//   id: 1337, // Default chain ID for a local node
//   name: "Localhost",
//   network: "localhost",
//   nativeCurrency: {
//     name: "Ether",
//     symbol: "ETH",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: { http: ["http://127.0.0.1:8547"] },
//   },
//   blockExplorers: {
//     default: { name: "None", url: "" },
//   },
//   testnet: true,
// }


const ABI = parseAbi([
  "function hola_mundo() public view returns (string)",
  "function mint_fractal(address owner) public",
  "function generate_fractal(uint256 tokenId) public",
  "function get_fractal(uint256 tokenId) public view returns (uint256 token_id, int256 x, int256 y, int256 size)",
])

const config = getDefaultConfig({
  appName: "42Fractol-NFT",
  projectId: "1c292f1868d3093656521f4e0f9eb5f8",
  chains: [arbitrumSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const queryClient = new QueryClient()

export default function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
