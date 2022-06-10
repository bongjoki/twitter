import { dbService, storageService } from 'firebaseInstance';
import React, { useState } from 'react';
import UserSection from './UserSection';
import styled from 'styled-components';
import { colorWhite } from './Css/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Menu, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

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

const Tweet = ({ tweet, isMyTweet }) => {
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const history = useHistory();
  const onOk = async () => {
    await dbService.doc(`tweets/${tweet.id}`).delete();
    await storageService.refFromURL(tweet.fileUrl).delete();
  };

  const menu = () => (
    <Menu
      items={[
        {
          label: (
            <button onClick={() => history.push(`/edit-tweet/${tweet.id}`)}>
              수정하기
            </button>
          ),
          key: '0',
        },
        {
          label: (
            <button onClick={() => setVisibleDeleteModal(true)}>
              삭제하기
            </button>
          ),
          key: '1',
        },
      ]}
    />
  );

  return (
    <StyledTweet>
      <UserSection user={tweet.user} />
      <h4 className="text">{tweet.text}</h4>
      {tweet.fileUrl && (
        <img className="tweet-image" src={tweet.fileUrl} alt="" />
      )}
      {isMyTweet && (
        <Dropdown overlay={menu} trigger={['click']}>
          <ShowMenuButton>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </ShowMenuButton>
        </Dropdown>
      )}
      <Modal
        title="삭제하기"
        visible={visibleDeleteModal}
        okText="삭제"
        cancelText="취소"
        onOk={onOk}
        onCancel={() => setVisibleDeleteModal(false)}
      >
        <p>정말로 트윗을 삭제하시겠습니까?</p>
      </Modal>
    </StyledTweet>
  );
};

export default Tweet;
