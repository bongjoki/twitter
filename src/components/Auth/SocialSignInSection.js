import React from 'react';
import { authService, firebaseInstance } from 'firebaseInstance';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { colorWhite } from 'components/Css/Colors';
import { buttonStyle1 } from 'components/Css/ButtonStyles';
import { result } from 'lodash';

const CompanyIcon = styled(FontAwesomeIcon)`
  position: absolute;
  width: 20px;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const GoogleButton = styled.button`
  ${buttonStyle1}
  background-color: ${colorWhite};
  font-weight: 600;
`;
const AppleButton = styled.button`
  margin-top: 12px;
  ${buttonStyle1}
  background-color: ${colorWhite};
  font-weight: 600;
`;
const SocialSignInSection = () => {
  const onSocialClick = async event => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    result = await authService.signInWithPopup(provider);
  };
  return (
    <>
      <GoogleButton name="google" onClick={onSocialClick}>
        <CompanyIcon icon={faGoogle} />
        Google 계정으로 계속하기
      </GoogleButton>
      <AppleButton name="github" onClick={onSocialClick}>
        <CompanyIcon icon={faGithub} />
        Github 계정으로 계속하기
      </AppleButton>
    </>
  );
};

export default SocialSignInSection;
