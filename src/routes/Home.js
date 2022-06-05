import Tweet from 'components/Tweet';
import { dbService } from 'firebaseInstance';
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed as penIcon } from '@fortawesome/free-solid-svg-icons';
import { colorBlue1 } from 'components/Css/Colors';
import { useHistory } from 'react-router-dom';

const StyledHome = styled.div`
  position: relative;
  min-height: calc(100vh - 48px);
  padding: 20px;
  padding-bottom: 60px;
`;

const AddTweetButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${colorBlue1};
  svg {
    width: 32px;
  }
`;

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);
  const history = useHistory();
  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <StyledHome>
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          isMyTweet={tweet.creatorId === user.uid}
        />
      ))}
      <AddTweetButton
        onClick={() => {
          history.push('/add-tweet');
        }}
      >
        <FontAwesomeIcon icon={penIcon} />
      </AddTweetButton>
    </StyledHome>
  );
};

export default Home;
