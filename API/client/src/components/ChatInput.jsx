/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';

function ChatInput(props) {
  return (
    <div>
      <form onSubmit={props.handleNewMessage}>
        <div className="row">
          <div className="col-11 pr-0">
            <input className="form-control" type="text" placeholder="Write a message..." />
          </div>
          <div className="col-1 d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default ChatInput;
