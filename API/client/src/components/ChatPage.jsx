/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import AuthHeader from '../services/auth-header';
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

function ChatPage() {
  const history = useHistory();
  const latestChat = useRef(null);
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

  const sendMessage = async (event, message) => {
    event.preventDefault();
    const chatMessage = {
      username: currentUser.username,
      message,
    };

    try {
      await axios({
        method: 'post',
        headers: AuthHeader(),
        url: 'api/messages',
        data: {
          message,
          user: {
            id: currentUser.userId,
            userName: currentUser.username,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    // const newMessage = message;
    // eslint-disable-next-line max-len
    // setMessages([...messages, { message: newMessage, user: { username: currentUser.Username } }]);
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

  latestChat.current = messages;
  useEffect(() => {
    setMessagesToState();
    setUsersToState();
  }, []);

  // useEffect(() => {

  // }, [messages]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/message')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then((result) => {
        console.log('Connected!');

        connection.on('sendToReact', (message) => {
          const newMessage = message;
          // eslint-disable-next-line max-len
          const updatedChat = [...latestChat.current, {
            message: message.message,
            user: { id: message.user.id, username: message.user.username },
          }];
          setMessages(updatedChat);
        });
      })
      .catch((e) => console.log('Connection failed: ', e));
  }, []);

  return (
    <div id="chat-page-container" className="container">
      <div id="chat-page-header" className="row">
        <div className="col-6">
          <h1 className="display-3">ChitChat</h1>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <h5 className="pr-2">{currentUser.username}</h5>
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
        <ChatInput saveNewMessage={sendMessage} />
      </div>

    </div>
  );
}

export default ChatPage;
