import React from 'react';

export default function Home(props) {
  const { user, loggedIn, showLogin, handleLogin } = props;
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
