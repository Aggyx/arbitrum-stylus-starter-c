"use client"

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { useRkAccountModal } from "@/lib/rainbowkit"
import { useAccount, useReadContract } from "wagmi"
import Navigation from "./Navigation"
import { parseAbi } from "viem"

const ADDRESS = "0xa3dba13932b816b8a57d7de25512e068522349eb"

const ABI = parseAbi([
  "function hola_mundo() public view returns (string)",
  "function mint_fractal(address owner) public",
  "function generate_fractal(uint256 tokenId) public",
])

export default function Container() {
  const result = useReadContract( {
    address:ADDRESS,
    abi: ABI,
    functionName: "hola_mundo",
    }
  )
  
  console.debug({result}) 
  const { openAccountModal } = useRkAccountModal()
  const { isConnected } = useAccount()

  return (
    <>
    <Navigation/>
    <section className="max-w-2xl mt-12 mx-auto">
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="w-full p-0 border border-b-2 grid grid-cols-2">
          <TabsTrigger className="h-full" value="feed">
            Everything
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              if (!isConnected) {
                // Abrimos el modal de conectar wallet
                // si no está conectado
                openAccountModal?.()
              }
            }}
            className="h-full"
            value="personal"
          >
            My publications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
              <section key={i} className="p-4 border rounded-lg">
                <nav className="flex items-center gap-1">
                  <strong>0x03242</strong>
                  <span className="opacity-70">posted</span>
                </nav>
                <p className="text-black/70 mt-2">
                  This is the feed where you can see all the posts from
                  everyone.
                </p>
              </section>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="personal">My publications</TabsContent>
      </Tabs>
    </section>
    </>
  )
}
