/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useEffect, useRef } from 'react';
import Message from './Message';

function ChatBox(props) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const displayMessages = () => {
    return props.messages.map((message) => {
      return (
        <Message
          key={message.id}
          usernameId={message.user.username}
          message={message.message}
        />
      );
    });
  };

  useEffect(scrollToBottom, [props.messages]);

  return (
    <div>
      <h3>Chat Box</h3>
      <div id="messages-container" className="">
        <ul id="messages" className="list-group border">
          {displayMessages()}
          <li ref={messagesEndRef} />
        </ul>
      </div>
    </div>
  );
}

export default ChatBox;
