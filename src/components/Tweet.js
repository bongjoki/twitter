import { dbService, storageService } from 'firebaseInstance';
import React, { useState } from 'react';
import UserSection from './UserSection';
import styled from 'styled-components';
import { colorWhite } from './Css/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Menu, Space } from 'antd';

const StyledTweet = styled.div`
  position: relative;
  .text {
    margin-top: 12px;
    color: ${colorWhite};
  }
  .tweet-image {
    margin-top: 12px;
    display: block;
    width: 50%;
    border-radius: 8px;
  }
  & + & {
    margin-top: 20px;
  }
`;

const ShowMenuButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 0;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Tweet = ({ tweet, isMyTweet, user }) => {
  const [newTweet, setNewTweet] = useState(tweet.text);
  const [menuVisible, setMenuVisible] = useState(false);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure tou want to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
      await storageService.refFromURL(tweet.fileUrl).delete();
    }
  };

  const menu = () => (
    <Menu
      items={[
        {
          label: <button>수정하기</button>,
          key: '0',
        },
        {
          label: <button onClick={onDeleteClick}>삭제하기</button>,
          key: '1',
        },
      ]}
    />
  );

  return (
    <StyledTweet>
      <UserSection user={user} />
      <h4 className="text">{tweet.text}</h4>
      {tweet.fileUrl && (
        <img className="tweet-image" src={tweet.fileUrl} alt="" />
      )}
      <Dropdown overlay={menu} trigger={['click']}>
        <ShowMenuButton>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </ShowMenuButton>
      </Dropdown>
    </StyledTweet>
  );
};

export default Tweet;
