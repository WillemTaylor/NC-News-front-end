import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Users extends Component {
  state = {
    users: [],
    username: '',
    name: '',
    avatar_url: '',
    userAdded: false
  };

  componentDidMount() {
    axios
      .get('https://nc-knews1.herokuapp.com/api/users')
      .then(({ data }) => {
        this.setState({ users: data.users });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Users:</h3>
        <form onSubmit={this.handleAddUser}>
            <input
               type="text"
               placeholder="Username"
               onChange={this.handleUsernameChange}
               value={this.state.username}
            />
            <input
               type="text"
               placeholder="Name"
               onChange={this.handleNameChange}
               value={this.state.name}
            />
            <input
               type="text"
               placeholder="Avatar URL"
               onChange={this.handleAvatarChange}
               value={this.state.avatar_url}
            />
          <button>Add User</button>
          {this.state.userAdded && <h3>User added!</h3>}
        </form>
        {this.state.users &&
          this.state.users.map(user => {
            return (
              <div key={user.username}>
                <p>
                  <Link to={`${user.username}`} id={user}>
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
    axios
      .post('https://nc-knews1.herokuapp.com/api/users', {
        username: this.state.username,
        name: this.state.name,
        avatar_url: this.state.avatar_url
      })
      .then(data => {
        if (data.status === 201) this.setState({ userAdded: true });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export default Users;
