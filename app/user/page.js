'use client'

import React, { useEffect, useState, Suspense } from 'react';
import GameHistory from '../components/GameHistory'
import Avatar from 'boring-avatars';
import styles from '../page.module.css';
import { getGamesForAddress } from '../contracts/contractMethods'
import { useMagic } from '../context/MagicProvider'
import { generateColors, computeScore } from '../utils/utils';
import { useSearchParams } from 'next/navigation'

const User = () => {
  const { web3 } = useMagic();
  const searchParams = useSearchParams()
  const address = searchParams.get('address')  
  const colors = generateColors(address);
  const [completedGames, setCompletedGames] = useState([])
  const [score, setScore] = useState(0);

  useEffect(()=>{
    const fetchGames = async () => {
      if (!web3 || !address) return;
      const games = await getGamesForAddress(web3, address)
      const filteredCompletedGames = games.filter(game =>game.gameCompleted);
      console.log(filteredCompletedGames)    
      setCompletedGames(filteredCompletedGames)
      let totalScore = computeScore(filteredCompletedGames, address)
      setScore(totalScore)

    }
    fetchGames();
  }, [web3]);

  return (
    <Suspense>
      <div>
        <div className={styles.userContainer}>
          <div className={styles.profileContainer}>
            <Avatar
                  size={40}
                  name={address}
                  variant="beam"
                  colors={colors}
            />
            <div className={styles.userAddress}>{address}</div>
            <div>&nbsp;&nbsp;{score} points</div>
          </div>
          <div className={styles.gameHistoryContainer}>
            {completedGames.length>0 ? <GameHistory address={address} games={completedGames}/> : ''}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default User;
