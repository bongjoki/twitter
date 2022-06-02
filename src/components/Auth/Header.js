import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { colorWhite } from 'components/Css/Colors';
import {
  FontSizeBody1,
  FontSizeBody3,
  FontSizeH1,
} from 'components/Css/FontSize';

const TwitterIcon = styled(FontAwesomeIcon)`
  color: ${colorWhite};
  font-size: ${FontSizeH1};
  cursor: pointer;
`;
const Description = styled.div`
  margin-top: 36px;
  color: ${colorWhite};
  font-size: ${FontSizeBody1};
  font-weight: 600;
`;
const SubDescription = styled.div`
  margin-top: 36px;
  color: ${colorWhite};
  font-size: ${FontSizeBody3};
  font-weight: 500;
`;

const Header = () => {
  return (
    <>
      <TwitterIcon icon={faTwitter} />
      <Description>지금 일어나고 있는 일</Description>
      <SubDescription>오늘 트위터에 가입하세요</SubDescription>
    </>
  );
};

export default Header;
