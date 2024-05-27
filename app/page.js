'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMagic } from "./context/MagicProvider";
import {abi, contractAddress} from './contracts/index.js'
import Profile from "./components/Profile";
import OpenGames from "./components/OpenGames";
import Players from "./components/Players";


export default function Home() {
  const { magic, web3 } = useMagic();
  const [address, setAddress] = useState(null)
  const [score, setScore] = useState(0)
  const [players, setPlayers] = useState([])
  const [openGames, setOpenGames] = useState([])
  const [closedGames, setClosedGames] = useState([])

  const handleLogin = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (!isLoggedIn) {
      let addresses = await magic.wallet.connectWithUI();
      setAddress(addresses[0])
      await registerPlayer(addresses[0])
    }else{
      let userInfo = await magic.user.getInfo();
      let address = userInfo.publicAddress;
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

    const fetchGames = async () => {
      try {
        if (!web3 || !address) return;
        const contract = new web3.eth.Contract(abi, contractAddress);
        const games = await contract.methods.getAllGamesForAddress(address).call();
        const filteredOpenGames = games.filter(game => !game.gameCompleted);
        const filteredCompletedGames = games.filter(game =>game.gameCompleted);
        console.log(filteredOpenGames)
        console.log(filteredCompletedGames)
        
        let totalScore = 0;
        filteredCompletedGames.forEach(game => {
          if (game.player1 === address) {
            totalScore += Number(game.player1ScoreDiff);
          } else if (game.player2 === address) {
            totalScore += Number(game.player2ScoreDiff);
          }
        });
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
        // Optionally update state or handle response
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  }

  return (
    <main className={styles.main}>
      <div><button onClick={handleLogin}>Login</button></div>      
      {address ? <Profile address={address} score={score} /> : <div>Please login</div>}
      {address ? <OpenGames address={address} challenges={openGames} /> : ''}
      <Players players={players} address={address}/>
    </main>
  );
}