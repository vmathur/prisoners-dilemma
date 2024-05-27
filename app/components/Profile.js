import React from 'react';

const Profile = ({ address, score }) => {
  return (
    <div>
      <h2>You</h2>
      <p>Address: ...{address.slice(-4)}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default Profile;
