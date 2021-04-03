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
      <div id="messages-container" className="">
        <ul id="messages" className="list-group border">
          {displayMessages()}
        </ul>
      </div>
    </div>
  );
}

export default ChatBox;
