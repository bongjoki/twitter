import TweetEditor from 'components/TweetEditor/TweetEditor';
import React from 'react';
import styled from 'styled-components';

const StyledAddTweet = styled.div`
  position: relative;
  padding: 72px 20px 60px 20px;
`;
const AddTweet = ({ user }) => {
  return (
    <StyledAddTweet>
      <TweetEditor user={user} isPost />
    </StyledAddTweet>
  );
};

export default AddTweet;
