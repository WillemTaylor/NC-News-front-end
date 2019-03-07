import React, { Component } from 'react';
import { getUser } from './api';

class UserDetails extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    getUser(this.props.username)
      .then(({ data }) => {
        this.setState({ user: data.user });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div key={this.state.user.username}>
        <h2 id="userTitle">User:</h2>
        <p className="topic">{this.state.user.name}</p>
        <p className="topic-items">Username: {this.state.user.username}</p>
        <img
          className="avatarImg"
          src={this.state.user.avatar_url}
          alt="avatar"
        />
      </div>
    );
  }
}

export default UserDetails;
