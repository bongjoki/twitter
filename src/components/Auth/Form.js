import { buttonStyle1 } from 'components/Css/ButtonStyles';
import { colorBlue1, colorWhite, colorGrey1 } from 'components/Css/Colors';
import { FontSizeBody3 } from 'components/Css/FontSize';
import { authService } from 'firebaseInstance';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { message } from 'antd';

const Divider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${colorWhite};
`;

const Line = styled.div`
  width: calc(50% - 24px);
  border-bottom: 0.2px solid #f6fbf4;
`;

const StyledAuthForm = styled.form`
  width: 100%;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  padding: 8px 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: ${colorWhite};
  ::placeholder {
    color: ${colorWhite};
  }
`;

const Submit = styled.input`
  ${buttonStyle1}
  background-color: ${colorBlue1};
  color: ${colorWhite};
`;

const Description = styled.div`
  margin-top: 20px;
  font-size: ${FontSizeBody3};
  font-weight: 500;
  color: ${colorWhite};
`;

const ToggleButton = styled.button`
  ${buttonStyle1}
  margin-top: 12px;
  border: 0.5px solid ${colorGrey1};
  background-color: transparent;
  color: ${colorBlue1};
`;
const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async event => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      }
      if (!newAccount) {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      message.error(e.message);
      setError(e.message);
    }
  };
  return (
    <>
      <Divider>
        <Line />
        또는
        <Line />
      </Divider>
      <StyledAuthForm onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={password}
          onChange={onChange}
        />
        <Submit
          type="submit"
          value={newAccount ? '이메일로 가입하기' : '이메일로 로그인'}
        />
        {error}
      </StyledAuthForm>
      <Description>
        {newAccount
          ? '이미 트위터에 가입하셨나요?'
          : '회원가입이 필요하신가요?'}
      </Description>
      <ToggleButton onClick={toggleAccount}>
        {newAccount ? '로그인' : '회원가입'}
      </ToggleButton>
    </>
  );
};

export default AuthForm;
