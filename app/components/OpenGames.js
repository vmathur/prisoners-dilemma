import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import Avatar from 'boring-avatars';
import { useMagic } from '../context/MagicProvider.js';
import {abi, contractAddress} from '../contracts/index.js'
import styles from '../page.module.css'; // Import the styles
import { generateColors } from '../utils/utils';
import '../page.module.css';

const colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

const OpenChallenges = ({ address, challenges }) => {
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
          console.log(`Challenge accepted with address: ${selectedPlayer} with choice: ${choice}`);
          if (!web3) return;
          try{
              let move = choice === 'cooperate' ? true : false;
              const encryptedMove = await fhenixClient.encrypt_bool(move)
              const contract = new web3.eth.Contract(abi, contractAddress);
              const response = await contract.methods.accept(selectedPlayer, encryptedMove).send({ from: address, gasPrice: 100000000});
              console.log(response)
          }catch(e){
            console.log(e)
            console.log('probably a gas issue')
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

    return (
        <div className={styles.openGamesContainer}>
            <h2 className={styles.openGamesHeading}>challenges</h2>
            <div>
                {challenges.map((challenge, index) => (
                    <div key={index} className={styles.openGameCard}>
                        <Link href={{
                            pathname:"/user",
                            query: { address: challenge.player2 }
                        }}>
                        <Avatar
                            size={40}
                            name={challenge.player2}
                            variant="beam"
                            colors={generateColors(challenge.player2)}
                        />
                        </Link>
                        <Link href={{
                            pathname:"/user",
                            query: { address: challenge.player2 }
                        }}>
                        <span className={styles.playerAddress}>...{challenge.player2.slice(-8)}</span>
                        </Link>
                        {challenge.player1 === address ? <button className={`${styles.button} ${styles.buttonDisabled}`} disabled={true}>Challenge sent</button> : null}
                        {challenge.player2 === address ? <button className={styles.button} onClick={() => openModal(challenge.player1)}>Respond</button> : null}

                    </div>
                ))}
            </div>
            <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>what will you do?</h2>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => handleChoice('cooperate')}>Cooperate 🤝</button>
                    <button className={styles.button} onClick={() => handleChoice('defect')}>Defect 😈</button>
                </div>
            </Modal>
        </div>
    );
};

export default OpenChallenges;
