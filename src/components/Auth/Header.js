import React from 'react';
import styledComponents from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const TwitterIcon = styledComponents(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 40px;
  cursor: pointer;
`;
const Description = styledComponents.div`
  margin-top: 36px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
`;
const SubDescription = styledComponents.div`
  margin-top: 36px;
  color: #ffffff;
  font-size: 16px;
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
