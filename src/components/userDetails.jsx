import React, { Component } from 'react';
import { getUser } from './api';
import { navigate } from '@reach/router';

export default class UserDetails extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    getUser(this.props.username)
      .then(({ data }) => {
        this.setState({ user: data.user });
      })
      .catch(({ response }) => {
        navigate('/Err404', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div key={user.username}>
        <h2 className="user-title">User:</h2>
        <p className="usersName">{user.name}</p>
        <p className="usersUsername">Username: {user.username}</p>
        <img className="avatarImg" src={user.avatar_url} alt="avatar" />
      </div>
    );
  }
}
