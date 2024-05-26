import React, { useEffect } from 'react';


const OpenChallenges = ({ challenges }) => {
    const acceptChallenge = async (playerAddress) => {
        console.log(`Challenge accepted with address: ${playerAddress}`);
        //TODO
    }

    useEffect(() => {
    },[]);
  
    return (
        <ul>
            {challenges.map((challenge, index) => (
                <li key={index}>Challenges with player: {challenge.player.slice(-4)}<button onClick={() => acceptChallenge(challenge.player)}>Accept</button></li>
            ))}
        </ul>
    );
};

export default OpenChallenges;
