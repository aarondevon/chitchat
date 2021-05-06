/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

function UserList(props) {
  const displayUsers = () => {
    return props.users.map((user) => {
      return <Dropdown className="list-group-item border-0" key={user.id}>{user.username}</Dropdown>;
    });
  };

  return (
    <div>
      <h3 id="user-title">Users</h3>
      <div>
        <ul id="user-list" className="list-group border">
          { displayUsers() }
        </ul>
      </div>

      <DropdownButton
        id="user-drop-right"
        drop="right"
        variant="dark"
        title="Users"
      >
        { displayUsers() }
      </DropdownButton>
    </div>
  );
}

export default UserList;
