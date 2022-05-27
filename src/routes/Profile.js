import { authService, dbService } from 'firebaseInstance';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ user }) => {
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
    console.log(tweets.docs.map(doc => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  });
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
