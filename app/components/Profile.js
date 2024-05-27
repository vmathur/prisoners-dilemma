import React from 'react';
import styles from '../page.module.css';
import Avatar from 'boring-avatars';
import { generateColors } from '../utils/utils';

const Profile = ({ address, score }) => {
  const colors = generateColors(address);

  return (
    <div className={styles.profileContainer}>
      <Avatar
        size={40}
        name={address}
        variant="beam"
        colors={colors}
      />
      <span className={styles.playerAddress}>...{address.slice(-8)}   </span>
      <span>&nbsp;&nbsp;{score} points</span>
    </div>
  );
};

export default Profile;
