import { authService } from 'firebaseInstance';
import React from 'react';
import { useState } from 'react';
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
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
