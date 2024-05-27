import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMagic } from '../context/MagicProvider.js';
import {abi, contractAddress} from '../contracts/index.js'
import styles from '../page.module.css'; // Import the styles

const OpenChallenges = ({ address, challenges }) => {
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
          console.log(`Challenge accepted with address: ${selectedPlayer} with choice: ${choice}`);
          if (!web3) return;
          let move = choice === 'cooperate' ? true : false;
          const contract = new web3.eth.Contract(abi, contractAddress);
          const response = await contract.methods.accept(selectedPlayer, move).send({ from: address });
          console.log(response)
          closeModal();
        }
    };
  
    return (
        <div>
            <h2>You've been challenged</h2>
            <div>
                {challenges.map((challenge, index) => (
                    <div key={index}>Challenged by ...{challenge.player1.slice(-4)}<button className={styles.button} onClick={() => openModal(challenge.player1)}>Respond</button></div>
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

export default OpenChallenges;
