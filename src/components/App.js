import AppRouter from 'components/Router';
import { useState } from 'react';
import { authService } from 'firebaseInstance';
import { useEffect } from 'react';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
      if (!user) {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}</>;
}

export default App;
