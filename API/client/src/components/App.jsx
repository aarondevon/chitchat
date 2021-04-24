/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import AuthService from '../services/auth.service';

import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import ChatPage from './ChatPage';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
      {/* <ChatPage /> */}
    </div>
  );
}

export default App;
