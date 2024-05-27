import React, { useState } from 'react';
import Modal from 'react-modal';
import Avatar from 'boring-avatars';
import { useMagic } from '../context/MagicProvider.js';
import { abi, contractAddress } from '../contracts/index.js';
import styles from '../page.module.css'; // Import the styles
import { generateColors } from '../utils/utils';


const colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

const Players = ({ address, players }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { web3 } = useMagic();

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
      let move = choice === 'cooperate' ? true : false;
      const contract = new web3.eth.Contract(abi, contractAddress);
      const response = await contract.methods.challenge(selectedPlayer, move).send({ from: address });
      console.log(response);
      closeModal();
    }
  };
  

  return (
    <div>
      <h2>all players</h2>
      <div className={styles.playerslist}>
        {players
          .filter(player => player.address !== address)
          .map((player, index) => (
            <div key={index}>
              <Avatar
                size={40}
                name={player.address}
                variant="beam"
                colors={generateColors(player.address)}
              />
              <span className={styles.playerAddress}>...{player.address.slice(-8)}</span>
              {address ? <button className={styles.button} onClick={() => openModal(player.address)}>Challenge</button> : null}
            </div>
          ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Choose your move</h2>
        <button className={styles.button} onClick={() => handleChoice('cooperate')}>Cooperate</button>
        <button className={styles.button} onClick={() => handleChoice('defect')}>Defect</button>
      </Modal>
    </div>
  );
};

export default Players;
