import React, { Component } from 'react';
import { addUser } from './api';
import { navigate } from '@reach/router';

export default class NewUser extends Component {
  state = {
    username: '',
    name: '',
    avatar_url: ''
  };

  render() {
    return (
      <form className="form3" onSubmit={this.handleAddUser}>
        <input
          className="username-form"
          type="text"
          placeholder="Username"
          onChange={this.handleUsernameChange}
          value={this.state.username}
          required
        />
        <input
          className="name-form"
          type="text"
          placeholder="Name"
          onChange={this.handleNameChange}
          value={this.state.name}
          required
        />
        <input
          className="avatar-form"
          type="text"
          placeholder="Avatar URL"
          onChange={this.handleAvatarChange}
          value={this.state.avatar_url}
          required
        />
        <button className="addUser">Add User</button>
      </form>
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
      .then(({ data }) => {
        this.props.setNewUser(data.users);
        this.setState({
          username: '',
          name: '',
          avatar_url: ''
        });
      })
      .catch(({ response }) => {
        navigate('/NoMatch', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}
