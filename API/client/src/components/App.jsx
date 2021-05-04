/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Register from './Register';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';
import ChatPage from './ChatPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/chatpage">
          <ChatPage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
