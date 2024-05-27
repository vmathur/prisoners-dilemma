import React from 'react';

const Profile = ({ address, score }) => {
  return (
    <div>
      <span>...{address.slice(-4)}   </span>
      <span>: {score} points</span>
    </div>
  );
};

export default Profile;
