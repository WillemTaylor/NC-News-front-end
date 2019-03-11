import React, { Component } from 'react';
import { getUsers } from './api';
import { navigate } from '@reach/router';
import NewUser from './newUser';
import UsersFilter from './usersFilter';

export default class Users extends Component {
  state = {
    users: [],
    username: '',
    name: '',
    avatar_url: ''
  };

  componentDidMount() {
    getUsers()
      .then(({ data }) => {
        this.setState({ users: data.users });
      })
      .catch(({ response }) => {
        navigate('/Err404', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { username, name, avatar_url, users } = this.state;
    return (
      <div>
        <NewUser
          setNewUser={this.setNewUser}
          username={username}
          name={name}
          avatar_url={avatar_url}
        />
        <h2 className="users-title">Users:</h2>
        {users && <UsersFilter users={users} />}
      </div>
    );
  }

  setNewUser = user => {
    this.setState({ users: [user, ...this.state.users] });
  };
}
