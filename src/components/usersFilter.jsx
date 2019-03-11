import React from 'react';
import { Link } from '@reach/router';

const UsersFilter = ({ users }) => {
  return users.map(user => {
    return (
      <div key={user.username}>
        <p>
          <Link className="users" to={`${user.username}`} id={user}>
            {user.username}
          </Link>
        </p>
      </div>
    );
  });
};

export default UsersFilter;
