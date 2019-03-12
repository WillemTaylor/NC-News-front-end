import React from 'react';

export default function Home(props) {
  const { user, loggedIn, handleLogin, handleLogout } = props;
  return (
    <div>
      <h1 id="homeTitle">Welcome to NC News {user}</h1>
      {!loggedIn && (
        <button className="login" onClick={handleLogin}>
          Log in
        </button>
      )}
      {loggedIn && (
        <button className="login" onClick={handleLogout}>
          Log out
        </button>
      )}
    </div>
  );
}
