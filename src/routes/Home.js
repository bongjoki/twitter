//snippets rafce
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'firebaseInstance';
import React from 'react';
import { useState, useEffect } from 'react';

const Home = ({ user }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    let fileUrl = null;
    if (attachment) {
      const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      fileUrl = await response.ref.getDownloadURL();
    }
    const tweetObject = {
      createdAt: Date.now(),
      creatorId: user.uid,
      text: tweet,
      fileUrl,
    };
    await dbService.collection('tweets').add(tweetObject);
    setTweet('');
    setAttachment();
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onChangeFile = event => {
    const {
      target: {
        files: [file],
      },
    } = event;
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };
  const onClearPhoto = () => setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" heigh="50px" alt="" />
            <button onClick={onClearPhoto}>Clear</button>
          </div>
        )}
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
