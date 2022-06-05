import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { FontSizeBody3 } from 'components/Css/FontSize';
import { colorBlue1, colorWhite } from 'components/Css/Colors';
import { isEmpty } from 'lodash';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: #000000;
  svg {
    cursor: pointer;
    color: ${colorWhite};
    path {
      color: ${colorWhite};
    }
  }
`;

const TweetButton = styled.button`
  position: relative;
  display: block;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 24px;
  border: none;
  display: flex;
  justify-content: center;
  font-size: ${FontSizeBody3};
  background-color: ${colorBlue1};
  color: ${colorWhite};
  font-weight: 600;
  opacity: ${props => (props.isFilled ? 1 : 0.5)};
`;

const Header = ({ tweet, attachment, onSubmit }) => {
  const history = useHistory();
  const isFilled = !(isEmpty(tweet) && isEmpty(attachment));
  return (
    <StyledHeader>
      <FontAwesomeIcon
        onClick={() => history.push('/')}
        icon={faArrowLeftLong}
      />
      <TweetButton isFilled={isFilled} onClick={onSubmit}>
        트윗하기
      </TweetButton>
    </StyledHeader>
  );
};

export default Header;
