/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import Message from './Message';

function ChatBox(props) {
  const displayMessages = () => {
    console.log(props.messages);
    return props.messages.map((message) => {
      return (
        <Message
          user={message.user}
          message={message.message}
        />
      );
    });
  };
  return (
    <div>
      <h3>Chat Box</h3>
      <ul className="list-group border">
        {props.messages.length > 1 && displayMessages()}
      </ul>
    </div>
  );
}

export default ChatBox;
