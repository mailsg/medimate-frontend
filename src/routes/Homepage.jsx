// Homepage.js
import React from 'react';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>
        Welcome,
        {user.email}
        !
      </h1>
      {/* Your homepage content here */}
    </div>
  );
};

export default Homepage;
