/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import AuthHeader from '../services/auth-header';
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

function ChatPage() {
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const currentUser = AuthService.getCurrentUser();

  const getMessages = async () => {
    const response = await axios.get('/api/messages', { headers: AuthHeader() });
    console.log('I tried to get messages');
    return response.data;
  };

  const setMessagesToState = async () => {
    const responseMessages = await getMessages();
    setMessages(responseMessages);
  };

  const addNewMessageToState = async (event, message) => {
    event.preventDefault();

    await axios({
      method: 'post',
      url: 'api/messages',
      data: {
        userId: currentUser.userId,
        message,
      },
    });
    const newMessage = message;
    setMessages([...messages, { message: newMessage, user: { username: currentUser.Username } }]);
  };

  const getUsers = async () => {
    const response = await axios.get('/api/users');
    console.log(response.data);
    return response.data;
  };

  const setUsersToState = async () => {
    const responseUsers = await getUsers();
    setUsers(responseUsers);
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push('/');
  };

  useEffect(() => {
    setMessagesToState();
    setUsersToState();
  }, []);

  useEffect(() => {

  }, [messages]);

  return (
    <div id="chat-page-container" className="container">
      <div id="chat-page-header" className="row">
        <div className="col-6">
          <h1 className="display-3">ChitChat</h1>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <h3>{currentUser.username}</h3>
          <button id="log-out" className="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <UserList users={users} />
        </div>
        <div className="col-9">
          <ChatBox messages={messages} />
        </div>
      </div>

      <div>
        <ChatInput saveNewMessage={addNewMessageToState} />
      </div>

    </div>
  );
}

export default ChatPage;
