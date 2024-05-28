import React from 'react';
import styles from '../page.module.css';
import Avatar from 'boring-avatars';
import { generateColors } from '../utils/utils';
import Link  from 'next/link';

const Profile = ({ address, score }) => {
  const colors = generateColors(address);

  return (
    <Link href={{
        pathname:"/user",
        query: { address: address }
      }}>
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
    </Link>
  );
};

export default Profile;
