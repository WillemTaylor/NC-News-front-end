import React, { Component } from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <button className="buttonLink">Home</button>
      </Link>
      <Link to="/topics">
        <button className="buttonLink1">Topics</button>
      </Link>
      <Link to="/articles">
        <button className="buttonLink2">Articles</button>
      </Link>
      <Link to="/users">
        <button className="buttonLink3">Users</button>
      </Link>
    </nav>
  );
};

export default NavBar;
