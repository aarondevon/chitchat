/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

function ChatInput(props) {
  const [message, setMessage] = useState('');

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    props.handleNewMessage(event, message);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleMessageSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" onChange={handleMessageInput} placeholder="Write a message..." aria-label="Recipient's username" aria-describedby="button-addon2" value={message} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit" id="button-addon2">Send</button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default ChatInput;
