import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const { user, loggedIn, showLogin, handleLogin } = this.props;
    return (
      <div>
        <h1 id="homeTitle">Welcome to NC News {user}</h1>
        {!loggedIn && showLogin && (
          <button className="login" onClick={handleLogin}>
            Log in
          </button>
        )}
      </div>
    );
  }
}
