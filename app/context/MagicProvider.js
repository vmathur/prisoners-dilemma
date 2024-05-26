"use client"
import { Magic } from "magic-sdk"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
const { Web3 } = require("web3")

const MagicContext = createContext({
  magic: null,
  web3: null,
})

export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }) => {
  const [magic, setMagic] = useState(null)
  const [web3, setWeb3] = useState(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || "", {
        network: {
            rpcUrl: 'https://sepolia.base.org',
            chainId: 84532,
        },
      })

      setMagic(magic)
      setWeb3(new Web3(magic.rpcProvider))
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
