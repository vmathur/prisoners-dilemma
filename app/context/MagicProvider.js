"use client"
import { Magic } from "magic-sdk"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
const { FhenixClient } = require("fhenixjs");
const { Web3 } = require("web3")

const MagicContext = createContext({
  magic: null,
  web3: null,
})

export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }) => {
  const [magic, setMagic] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [fhenixClient, setFhenixClient] = useState(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || "", {
        network: {
            rpcUrl: 'https://api.testnet.fhenix.zone',
            chainId: 42069,
        },
      })
      setMagic(magic)
      let web3 = new Web3(magic.rpcProvider)
      setWeb3(web3)
      // const provider = web3.provider;
      // const fhenixClient = new FhenixClient({provider});
      // setFhenixClient(fhenixClient)
    } else {
      console.error("NEXT_PUBLIC_MAGIC_API_KEY is not set")
    }
  }, [])

  const value = useMemo(() => {
    return {
      magic,
      web3,
    }
  }, [magic, web3])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}

export default MagicProvider
