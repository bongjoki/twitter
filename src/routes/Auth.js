import AuthForm from 'components/Auth/Form';
import AuthHeader from 'components/Auth/Header';
import CssMarginTop from 'components/Css/MarginTop';
import SocialSignInSection from 'components/Auth/SocialSignInSection';
import React from 'react';
import styledComponents from 'styled-components';

const AuthPage = styledComponents.div`
  padding: 32px;
`;

const Auth = () => {
  return (
    <AuthPage>
      <AuthHeader />
      <CssMarginTop value={20} />
      <SocialSignInSection />
      <CssMarginTop value={32} />
      <AuthForm />
    </AuthPage>
  );
};

export default Auth;
