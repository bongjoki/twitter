import Tweet from 'components/Tweet';
import { authService, dbService } from 'firebaseInstance';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledProfile = styled.div`
  position: relative;
  min-height: calc(100vh - 48px);
  padding: 20px;
  padding-bottom: 60px;
`;

const Profile = ({ user, refreshUser }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [tweets, setTweets] = useState();
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  useEffect(() => {
    const getMyTweets = async () => {
      await dbService
        .collection('tweets')
        .where('user.id', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          const tweets = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setTweets(tweets);
        });
    };
    getMyTweets();
  }, [user.uid]);
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
    <StyledProfile>
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
      {tweets &&
        tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isMyTweet={tweet.user.id === user.uid}
          />
        ))}
    </StyledProfile>
  );
};

export default Profile;
