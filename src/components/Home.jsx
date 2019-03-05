import React, {Component } from 'react';
import axios from 'axios'

class Home extends Component {
   state = {
      users: [],
      user: '',
      loggedIn: false
   };

   componentDidMount() {
      axios.get('https://nc-knews1.herokuapp.com/api/users').then(({ data }) => {
         this.setState({ users: data.users });
      });
   }
   render() {
  return (
      <div>
        <h1 id="homeTitle">Welcome to NC News {this.state.user}</h1>
        <button className="login" onClick={this.handleLogin}>
           Log in
        </button>
        {this.state.loggedIn}
      </div>
  );
   }
handleLogin = event => {
   const randomUser = 2;
   event.preventDefault();
   this.setState({
      loggedIn: true,
      user: this.state.users[randomUser].username
   });
};
}


export default Home;
