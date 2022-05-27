import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = ({ user }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {user.displayName ? `${user.displayName} Profile` : 'user profile'}
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
