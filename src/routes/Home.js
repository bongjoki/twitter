//snippets rafce
import { dbService } from 'firebaseInstance';
import { doc } from 'prettier';
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

  const onChnage = event => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        value={tweet}
        onChange={onChnage}
      />
      <input type="submit" value="Tweet" />
      <div>
        {tweets.map(t => (
          <div key={t.id}>
            <h4>{t.text}</h4>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Home;
