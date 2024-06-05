import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import Avatar from 'boring-avatars';
import { useMagic } from '../context/MagicProvider.js';
import { abi, contractAddress } from '../contracts/index.js';
import styles from '../page.module.css'; // Import the styles
import { generateColors } from '../utils/utils';
import '../page.module.css';

const Players = ({ address, players, yourChallengers, playersChallenged }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { web3, fhenixClient } = useMagic();

  const openModal = (playerAddress) => {
    setSelectedPlayer(playerAddress);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPlayer(null);
  };

  const handleChoice = async (choice) => {
    if (selectedPlayer) {
      console.log(`Challenge started with address: ${selectedPlayer} and choice: ${choice}`);
      if (!web3) return;
      try{
        let move = choice === 'cooperate' ? true : false;
        const encryptedMove = await fhenixClient.encrypt_bool(move) //todo encrypt the move
        const contract = new web3.eth.Contract(abi, contractAddress);
        const response = await contract.methods.challenge(selectedPlayer, encryptedMove).send({ from: address, gasPrice: 100000000});
        console.log(response);
      }catch(e){
        console.log(e)
      }
      closeModal();
    }
  };

  const customStyles = {
    content: {
      height: '50%',
      width: '50%',
      placeSelf: 'center',
      textAlign: 'center',
      alignContent: 'center'
    },
  };

  if(!fhenixClient){
    return 'Loading...'
  }

  return (
    <div className={styles.playersContainer}>
      <h2 className={styles.playersHeading}>all players</h2>
      <div className={styles.playerslist}>
        {players
          .filter(player => player.address !== address)
          .map((player, index) => (
            <div key={index} className={styles.playerCard}>
                <Link href={{
                  pathname:"/user",
                  query: { address: player.address }
                }}>
                <Avatar
                  size={40}
                  name={player.address}
                  variant="beam"
                  colors={generateColors(player.address)}
                />
                </Link>
                <Link href={{
                  pathname:"/user",
                  query: { address: player.address }
                }}>
                <span className={styles.playerAddress}>...{player.address.slice(-8)}</span>
                 </Link>
                {address && !yourChallengers.includes(player.address) && !playersChallenged.includes(player.address) ? <button className={styles.button} onClick={() => openModal(player.address)}>Challenge</button> : null}
              </div>
          ))}
      </div>
      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>choose your move</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleChoice('cooperate')}>Cooperate 🤝</button>
          <button className={styles.button} onClick={() => handleChoice('defect')}>Defect 😈</button>
        </div>
      </Modal>
    </div>
  );
};

export default Players;
