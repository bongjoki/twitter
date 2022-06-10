import { dbService, storageService } from 'firebaseInstance';
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { colorRed1, colorWhite } from 'components/Css/Colors';
import { FontSizeBody3 } from 'components/Css/FontSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Loading from 'components/Loading';
import UserSection from 'components/UserSection';

const StyledTweetEditor = styled.div`
  form {
    margin-top: 12px;
  }
  textarea {
    width: 100%;
    height: 120px;
    background-color: transparent;
    border: none;
    color: ${colorWhite};
    font-size: ${FontSizeBody3};
    ::placeholder {
      font-size: ${FontSizeBody3};
    }
  }
  .camera-icon {
    margin-top: 12px;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

const AttachedImage = styled.div`
  width: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .delete-button {
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: ${colorRed1};
  }
`;

const TweetEditor = ({
  user,
  tweetId,
  savedTweet,
  savedAttachment,
  isPost,
}) => {
  const imageInputRef = useRef(null);
  const [tweet, setTweet] = useState(savedTweet || '');
  const [attachment, setAttachment] = useState(savedAttachment || '');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const onSubmit = async event => {
    setIsLoading(true);
    event.preventDefault();
    let fileUrl = null;
    if (attachment) {
      const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      fileUrl = await response.ref.getDownloadURL();
    }
    const tweetObject = {
      createdAt: Date.now(),
      text: tweet,
      fileUrl,
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
        email: user.email,
      },
    };
    if (isPost) {
      await dbService.collection('tweets').add(tweetObject);
    }
    if (!isPost) {
      await dbService.doc(`tweets/${tweetId}`).update({ text: tweet, fileUrl });
    }
    setTweet('');
    setAttachment();
    history.push('/');
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
  const onClearPhoto = () => {
    setAttachment(null);
    imageInputRef.current.value = null;
  };
  return (
    <StyledTweetEditor>
      <Header tweet={tweet} attachment={attachment} onSubmit={onSubmit} />
      <UserSection user={user} />
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        {attachment && (
          <AttachedImage>
            <img src={attachment} alt="" />
            <button className="delete-button" onClick={onClearPhoto}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </AttachedImage>
        )}
        <FontAwesomeIcon
          className="camera-icon"
          icon={faCamera}
          onClick={() => imageInputRef.current.click()}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={onChangeFile}
          hidden
        />
      </form>
      {isLoading && <Loading />}
    </StyledTweetEditor>
  );
};

export default TweetEditor;
