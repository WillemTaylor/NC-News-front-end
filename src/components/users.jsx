import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUsers, addUser } from './api';
import { navigate } from '@reach/router';

export default class Users extends Component {
  state = {
    users: [],
    username: '',
    name: '',
    avatar_url: '',
    userAdded: false
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
    const { username, name, avatar_url, userAdded, users } = this.state;
    return (
      <div classname="userDiv">
        <form className="form3" onSubmit={this.handleAddUser}>
          <input
            className="username-form"
            type="text"
            placeholder="Username"
            onChange={this.handleUsernameChange}
            value={username}
            required
          />
          <input
            className="name-form"
            type="text"
            placeholder="Name"
            onChange={this.handleNameChange}
            value={name}
            required
          />
          <input
            className="avatar-form"
            type="text"
            placeholder="Avatar URL"
            onChange={this.handleAvatarChange}
            value={avatar_url}
            required
          />
          <button className="addUser">Add User</button>
          {userAdded && <h3 className="addedUser">User added!</h3>}
        </form>
        <h2 id="title3">Users:</h2>
        {users &&
          users.map(user => {
            return (
              <div key={user.username}>
                <p>
                  <Link className="users" to={`${user.username}`} id={user}>
                    {user.username}
                  </Link>
                </p>
              </div>
            );
          })}
      </div>
    );
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleAvatarChange = event => {
    this.setState({ avatar_url: event.target.value });
  };

  handleAddUser = event => {
    event.preventDefault();
    addUser({
      username: this.state.username,
      name: this.state.name,
      avatar_url: this.state.avatar_url
    })
      .then(data => {
        if (data.status === 201) this.setState({ userAdded: true });
      })
      .catch(({ response }) => {
        navigate('/NoMatch', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}
