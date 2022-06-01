import React from 'react';
import { authService, firebaseInstance } from 'firebaseInstance';
import styledComponents, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const CompanyIcon = styledComponents(FontAwesomeIcon)`
  position: absolute;
  font-size: 20px;
  right:20px;
`;

const buttonStyle = css`
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  padding: 8px 0;
  border-radius: 24px;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;
const GoogleButton = styledComponents.button`
  ${buttonStyle}
`;
const AppleButton = styledComponents.button`
  margin-top: 12px;
  ${buttonStyle}
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
    await authService.signInWithPopup(provider);
  };
  return (
    <>
      <GoogleButton name="google" onClick={onSocialClick}>
        <CompanyIcon icon={faGoogle} />
        Continue with Google
      </GoogleButton>
      <AppleButton name="github" onClick={onSocialClick}>
        <CompanyIcon icon={faGithub} />
        Continue with Github
      </AppleButton>
    </>
  );
};

export default SocialSignInSection;
