import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AddTweet from 'routes/AddTweet';
import EditTweet from 'routes/EditTweet';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ refreshUser, isLoggedIn, user }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation user={user} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile user={user} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/add-tweet">
              <AddTweet user={user} />
            </Route>
            <Route path="/edit-tweet/:id">
              <EditTweet user={user} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
