import React from 'react';

const Profile = ({ address, score }) => {
  return (
    <div>
      <h3>Your address: {address}</h3>
      <p>Score: {score}</p>
    </div>
  );
};

export default Profile;
