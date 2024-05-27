import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { abi, contractAddress } from '../app/contracts/index.js';
import { useMagic } from '../app/context/MagicProvider.js';
import styles from './history.css';

const History = () => {
  const router = useRouter();
  const { address } = router.query;
  const { web3 } = useMagic();
  const [completedGames, setCompletedGames] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchCompletedGames = async () => {
      try {
        console.log('getching')
        console.log(address)
        console.log(web3)
        if (!web3 || !address) return;
        console.log('yo')
        const contract = new web3.eth.Contract(abi, contractAddress);
        const games = await contract.methods.getAllGamesForAddress(address).call();
        const filteredCompletedGames = games.filter(game => game.gameCompleted);
        
        let totalScore = 0;
        filteredCompletedGames.forEach(game => {
          if (game.player1 === address) {
            totalScore += Number(game.player1ScoreDiff);
          } else if (game.player2 === address) {
            totalScore += Number(game.player2ScoreDiff);
          }
        });

        setScore(totalScore);
        setCompletedGames(filteredCompletedGames);
      } catch (error) {
        console.error('Failed to fetch completed games:', error);
      }
    };

    fetchCompletedGames();
  }, [web3, address]);

  return (
    <main className={styles.main}>
      <h2>Total Score: {score}</h2>
      <div className={styles.completedGamesSection}>
        {completedGames.length > 0 ? (
          completedGames.map((game, index) => (
            <div key={index} className={styles.game}>
              <p>Game ID: {game.gameId}</p>
              <p>Player 1: {game.player1}</p>
              <p>Player 2: {game.player2}</p>
              <p>Winner: {game.winner}</p>
              <p>Score Difference: {game.player1 === address ? game.player1ScoreDiff : game.player2ScoreDiff}</p>
            </div>
          ))
        ) : (
          <p>No completed games found.</p>
        )}
      </div>
    </main>
  );
};

export default History;
