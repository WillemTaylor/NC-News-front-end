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
        <h2 id="userTitle">User:</h2>
        <p className="topic">{user.name}</p>
        <p className="topic-items">Username: {user.username}</p>
        <img className="avatarImg" src={user.avatar_url} alt="avatar" />
      </div>
    );
  }
}
