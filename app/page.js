'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'

import { useEffect, useState } from "react";
import { useMagic } from "./context/MagicProvider";
import {contractAddress} from './contracts/index.js'
import { getGamesForAddress } from './contracts/contractMethods'
import Profile from "./components/Profile";
import OpenGames from "./components/OpenGames";
import Players from "./components/Players";
import { computeScore } from "./utils/utils";

export default function Home() {
  const { magic, web3 } = useMagic();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState(null)
  const [score, setScore] = useState(0)
  const [players, setPlayers] = useState([])
  const [openGames, setOpenGames] = useState([])
  const [closedGames, setClosedGames] = useState([])

  const handleLogin = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    setIsLoggedIn(isLoggedIn);
    if (!isLoggedIn) {
      let addresses = await magic.wallet.connectWithUI();
      setAddress(addresses[0])
      setIsLoggedIn(true)
      await registerPlayer(addresses[0])
    }else{
      let userInfo = await magic.user.getInfo();
      let address = userInfo.publicAddress;
      setAddress(address)
      await registerPlayer(address)
    }
  };

  const handleLogout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
    setOpenGames([])
    setClosedGames([])
    setScore(0)
    setAddress(null)
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

    const fetchGames = async () => {
      try {
        if (!web3 || !address) return;
        const games = await getGamesForAddress(web3, address)

        const filteredOpenGames = games.filter(game => !game.gameCompleted);
        const filteredCompletedGames = games.filter(game =>game.gameCompleted);
        let totalScore = computeScore(filteredCompletedGames, address)
        setScore(totalScore);
        setOpenGames(filteredOpenGames);
        setClosedGames(filteredCompletedGames);
      } catch (error) {
        console.error('Failed to fetch open challenges:', error);
      }
    };

    fetchPlayers();
    fetchGames();
  }, [web3, address]);

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
        // console.log('User registered:', data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  }

  return (
    <main className={styles.main}>
      <div className={styles.headerSection}>
        <span className={styles.profileSection}>
          {address ? <Profile address={address} score={score} /> : ''}
        </span>
        {!isLoggedIn ? (
          <span>
            <button className={styles.button} onClick={handleLogin}>Connect</button>
          </span>
        ) : (
          <span>
            <button className={`${styles.button} ${styles.disconnectButton}`} onClick={handleLogout}>Disconnect</button>
          </span>
        )}
      </div>

      <div className={styles.middleSection}>
        <div className={styles.openGamesSection}>
          {address && openGames.length > 0 ? <OpenGames address={address} challenges={openGames} /> : ''}
        </div>
        
        <div className={styles.playersSection}>
          <Players players={players} address={address} />
        </div>
      </div>

      <div className={styles.contractLinkSection}>
        <u><i><a href={`https://sepolia.basescan.org/address/${contractAddress}#code`} target="_blank" rel="noopener noreferrer">View contract</a></i></u>
      </div>
    </main>
  );
}
