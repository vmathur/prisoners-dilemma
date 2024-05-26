'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMagic } from "./context/MagicProvider";
import { Magic } from "magic-sdk";
import Web3 from "web3";
import Profile from "./components/Profile";
import OpenChallenges from "./components/OpenChallenges";
import Players from "./components/Players";

export default function Home() {
  const { magic, web3 } = useMagic();
  const [address, setAddress] = useState(0)
  const [score, setScore] = useState(0)
  const [players, setPlayers] = useState([])
  const [openChallenges, setOpenChallenges] = useState([])

  const handleLogin = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    console.log('isLoggedIn?', isLoggedIn)
    if (!isLoggedIn) {
      let addresses = await magic.wallet.connectWithUI();
      console.log('Logged in');
      setAddress(addresses[0])
      await registerPlayer(addresses[0])
    }else{
      let userInfo = await magic.user.getInfo();
      console.log(userInfo)
      let address = userInfo.publicAddress;
      console.log(address)
      setAddress(address)
      await registerPlayer(address)
    }
  };

useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/getUsers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const users = data.users.map(user => ({ address: user }));
      setPlayers(users);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  fetchPlayers();
}, []);

  const registerPlayer = async (address) =>{
      fetch('/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: address }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('User registered:', data);
        // Optionally update state or handle response
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  }

  useEffect(() => {
    let challenge = {
      player: '0x125fsd423d'
    }

    setOpenChallenges([...openChallenges, challenge])
    let player = {
      address: '0x125fsd423d'
    }

    setPlayers([...players, player])

  }, [])

  return (
    <main className={styles.main}>
      <div><button onClick={handleLogin}>Login</button></div>
      <h2>You</h2>
      <Profile address={address} score={score} />
      <h2>Respond</h2>
      <OpenChallenges challenges={openChallenges} />
      <h2>Challenge someone</h2>
      <Players players={players} />
    </main>
  );
}