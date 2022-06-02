import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import { dbService } from 'firebaseInstance';
import React from 'react';
import { useState, useEffect } from 'react';

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <>
      <TweetFactory user={user} />
      <div>
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isMyTweet={tweet.creatorId === user.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
