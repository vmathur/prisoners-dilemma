import React from 'react';
import styles from '../page.module.css';

const GameHistory = ({ address, games }) => {
    console.log(games);

    const getScoreStyle = (scoreDiff) => ({
        color: scoreDiff > 0 ? 'green' : 'red'
    });

    return (
        <div>
            <div className={styles.gameHistoryList}>
                {games.map((game, index) => (
                    <div key={index} className={styles.gameHistoryItem}>
                        <div><b>Game {index + 1}</b></div>
                        {game.player1 === address && (
                            <>
                                <div>address: {game.player1}</div>
                                <div>move: {game.player1Move ? 'cooperate' : 'defect'}</div>
                                <div style={getScoreStyle(game.player1ScoreDiff)}>
                                    {Number(game.player1ScoreDiff) > 0 ? '+' : ''}{Number(game.player1ScoreDiff)}
                                </div>
                            </>
                        )}
                        {game.player2 === address && (
                            <>
                                <div>address: {game.player2}</div>
                                <div>move: {game.player2Move ? 'cooperate' : 'defect'}</div>
                                <div style={getScoreStyle(game.player2ScoreDiff)}>
                                    {Number(game.player2ScoreDiff) > 0 ? '+' : ''}{Number(game.player2ScoreDiff)}
                                </div>                            
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameHistory;

