/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  DropdownButton,
  // Dropdown,
} from 'react-bootstrap';

function UserList(props) {
  const displayUsers = () => {
    return props.users.map((user) => {
      return <li className="list-group-item border-0" key={user.id}>{user.username}</li>;
    });
  };

  return (
    <div>
      <h3 id="user-title">Users</h3>
      <div>
        <ul id="user-list" className="list-group border">
          { displayUsers() }
        </ul>
        <DropdownButton
          id="user-drop-right"
          drop="right"
          variant="dark"
          title="Users"
        >
          <ul id="user-drop-list">
            { displayUsers() }
          </ul>
        </DropdownButton>
      </div>
    </div>
  );
}

export default UserList;
