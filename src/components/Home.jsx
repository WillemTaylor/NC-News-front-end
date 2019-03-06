import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <h1 id="homeTitle">Welcome to NC News {this.props.user}</h1>
        {!this.props.loggedIn && this.props.showLogin && (
          <button className="login" onClick={this.props.handleLogin}>
            Log in
          </button>
        )}
      </div>
    );
  }
}

export default Home;
