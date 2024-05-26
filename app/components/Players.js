import React from 'react';

const Players = ({ players }) => {
  const startChallenge = async (playerAddress) => {
    console.log(`Challenge started with address: ${playerAddress}`);
    //TODO
  }

  return (
    <ul>
      {players.map((player, index) => (
        <li key={index}>
          Address: ...{player.address.slice(-4)}
          <button onClick={() => startChallenge(player.address)}>Challenge</button>
        </li>
      ))}
    </ul>
  );
};

export default Players;
