import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './components/topics';
import Articles from './components/articles';
import ArticleById from './components/articleById';
import Users from './components/users';
import UserDetails from './components/userDetails';
import Comments from './components/comments';
import Home from './components/Home';
import logo from './logo.jpeg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className="image" src={logo} alt="background" />
        <nav>
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
        <Router>
          <Home path="/" />
          <Topics path="/topics" />
          <Articles path="/articles" />
          <ArticleById path="/articles/:article_id" />
          <Comments path="/articles/:article_id/comments" />
          <Users path="/users" />
          <UserDetails path="/users/:username" />
          <Err400 path="/400" />
          <Err422 path="/422" />
          <NoMatch default />
        </Router>
      </div>
    );
  }
}

const Err400 = props => {
  return <h1>{props.location.state.data['Error 400']}</h1>;
};

const Err422 = props => {
  return <h1>{props.location.state.data['Error 422']} Please sign in</h1>;
};

const NoMatch = () => (
  <div>
    <h2>Error 404: URL not found</h2>
  </div>
);

export default App;
