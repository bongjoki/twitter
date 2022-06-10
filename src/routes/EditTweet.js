import TweetEditor from 'components/TweetEditor/TweetEditor';
import { dbService } from 'firebaseInstance';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const StyledEditTweet = styled.div`
  position: relative;
  padding: 72px 20px 60px 20px;
`;

const EditTweet = ({ user }) => {
  const { id } = useParams();
  const [tweet, setTweet] = useState();
  useEffect(() => {
    dbService
      .collection('tweets')
      .doc(id)
      .get()
      .then(snapshot => setTweet(snapshot.data()));
  }, []);
  return (
    <StyledEditTweet>
      {tweet && (
        <TweetEditor
          user={user}
          tweetId={id}
          savedTweet={tweet.text}
          savedAttachment={tweet.fileUrl}
        />
      )}
    </StyledEditTweet>
  );
};

export default EditTweet;
