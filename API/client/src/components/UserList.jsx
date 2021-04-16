/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

function UserList(props) {
  const displayUsers = () => {
    return props.users.map((user) => {
      return <li className="list-group-item border-0">{user.username}</li>;
    });
  };

  return (
    <div>
      <h3>Active Users</h3>
      <ul id="user-list" className="list-group border">
        { displayUsers() }
      </ul>
    </div>
  );
}

export default UserList;
