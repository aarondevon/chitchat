import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ChatPage from './ChatPage';

function HomePage() {
  return (
    <div id="home-page-container">
      <div id="login-container">
        <h1>ChitChat</h1>
        {/* <button> Log In</button> */}
        <Link to="/login"> Log In</Link>
        <div>
          <Link to="/register">Sign Up </Link>
          {/* <a href="#">Demo</a> */}
        </div>
      </div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/chatpage">
          <ChatPage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default HomePage;
