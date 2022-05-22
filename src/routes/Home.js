//snippets rafce
import Tweet from 'components/Tweet';
import { dbService } from 'firebaseInstance';
import React from 'react';
import { useState, useEffect } from 'react';

const Home = ({ user }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      createdAt: Date.now(),
      creatorId: user.uid,
      text: tweet,
    });
    setTweet('');
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
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
