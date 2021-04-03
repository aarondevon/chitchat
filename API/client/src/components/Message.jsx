/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function Message(props) {
  return <li className="list-group-item border-0">{`${props.user}:  ${props.message}`}</li>;
}

export default Message;
