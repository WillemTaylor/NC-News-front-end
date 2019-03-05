import React, { Component } from 'react';
import axios from 'axios';

class UserDetails extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    axios
      .get(`https://nc-knews1.herokuapp.com/api/users/${this.props.username}`)
      .then(({ data }) => {
        this.setState({ user: data.user });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
        <div key={this.state.user.username}>
            <h3>User:</h3>
            {/* {this.state.user.map()} */}
            <p>Name: {this.state.user.name}</p>
            <p>Username: {this.state.user.username}</p>
            <img src={this.state.user.avatar_url} alt="avatar"/>
         </div>
      );
  }
}

export default UserDetails;
