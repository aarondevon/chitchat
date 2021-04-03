/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const dummyMessages = [
  { user: 'Abigail S', message: 'It\'s your birthday month!' },
  { user: 'Aaron S', message: 'I know! I am getting old!' },
  { user: 'Abigail S', message: 'Yeah you are!' },
  { user: 'Aaron S', message: '-_-' },
  { user: 'Abigail S', message: 'Muahahahaha!' },
  { user: 'John C', message: 'Yo!' },
  { user: 'Aaron S', message: 'Hey!' },
];

function ChatPage() {
  const [messages, setMessages] = useState(dummyMessages);

  const addNewMessageToState = (event, message) => {
    event.preventDefault();

    const newMessage = message;
    setMessages([...messages, { user: 'Aaron S', message: newMessage }]);
  };

  useEffect(() => {

  }, [messages]);

  return (
    <div id="chat-page-container" className="container">
      <div id="chat-page-header" className="row">
        <div className="col-6">
          <h1 className="display-3">ChitChat</h1>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <button id="log-out" className="btn btn-primary">Log Out</button>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <UserList />
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
