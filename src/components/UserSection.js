import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const StyledUserSection = styled.div`
  display: flex;
  align-items: center;
  .image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 12px;
    &.empty {
      background-color: #455964;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  span {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const UserSection = ({ user }) => {
  const { photoURL, displayName, id, uid } = user;
  return (
    <StyledUserSection>
      {photoURL ? (
        <img className="image" src={photoURL} alt="" />
      ) : (
        <div className="image empty">
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
      <span>{displayName || `USER${id || uid}`}</span>
    </StyledUserSection>
  );
};

export default UserSection;
