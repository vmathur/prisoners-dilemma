import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMagic } from '../context/MagicProvider.js';
import {abi, contractAddress} from '../contracts/index.js'

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
      console.log(response)
      closeModal();
    }
  };

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players
          .filter(player => player.address !== address)
          .map((player, index) => (
            <li key={index}>
              ...{player.address.slice(-4)}
              {address ? <button onClick={() => openModal(player.address)}>Challenge</button> : null}
            </li>
          ))}
      </ul>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Choose your move</h2>
        <button onClick={() => handleChoice('cooperate')}>Cooperate</button>
        <button onClick={() => handleChoice('defect')}>Defect</button>
      </Modal>
    </div>
  );
};

export default Players;
