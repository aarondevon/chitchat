import React from 'react';

function UserList() {
  return (
    <div>
      <h3>Active Users</h3>
      <ul id="user-list" className="list-group border">
        <li className="list-group-item border-0">Abigail S</li>
        <li className="list-group-item border-0">John C</li>
        <li className="list-group-item border-0">Aaron S</li>
      </ul>
    </div>
  );
}

export default UserList;
