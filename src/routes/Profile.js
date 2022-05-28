import { authService, dbService } from 'firebaseInstance';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ user, refreshUser }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get();
  };
  useEffect(() => {
    getMyTweets();
  });
  const onChangeDisplayname = e => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (user.displayName !== displayName) {
      //TODO PhotoUrl 업데이트
      await user.updateProfile({ displayName });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChangeDisplayname}
          value={displayName}
        />
        <input type="submit" placeholder="Update profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
