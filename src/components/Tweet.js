import { dbService, storageService } from 'firebaseInstance';
import React, { useState } from 'react';

const Tweet = ({ tweet, isMyTweet }) => {
  const [editable, setEditable] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure tou want to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
      await storageService.refFromURL(tweet.fileUrl).delete();
    }
  };
  const toggleEditable = () => setEditable(prev => !prev);
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweet.id}`).update({
      text: newTweet,
    });
    setEditable(false);
  };
  const onChangeTweet = event => {
    setNewTweet(event.target.value);
  };
  return (
    <div>
      {editable ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChangeTweet}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditable}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {tweet.fileUrl && (
            <img src={tweet.fileUrl} width="50px" height="50px" alt="" />
          )}
          {isMyTweet && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditable}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
