import AppRouter from 'components/Router';
import { useState } from 'react';
import { authService } from 'firebaseInstance';
import { useEffect } from 'react';
import { cloneDeep } from 'lodash';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      }
      if (!user) {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = cloneDeep(authService.currentUser);
    setUserObject(user);
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          user={userObject}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
