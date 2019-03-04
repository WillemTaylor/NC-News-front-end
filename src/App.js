import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";
import Topics from './components/topics';
import Articles from './components/articles';
import ArticleById from './components/articleById';
import Users from './components/users';
import UserDetails from './components/userDetails';
import Comments from './components/comments';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NC News!</h1>
        <nav>
          <Link to= "/"><button>Home</button></Link>
          <Link to= "/topics"><button>Topics</button></Link>
          <Link to= "/articles"><button>Articles</button></Link>
          <Link to= "/users"><button>Users</button></Link>
        </nav>
        <Router>
          <Home path="/" />
          <Topics path="/topics" />
          <Articles path="/articles" />
          <ArticleById path="/articles/:article_id" />
          <Comments path="/articles/:article_id/comments" />
          <Users path="/users" />
          <UserDetails path="/users/:username" />
          <NoMatch default />
        </Router>
      </div>
    );
  }
}

const Home = () => (
  <div></div>
)

const NoMatch = () => (
  <div>
    <h2>Error 404: URL not found</h2>
  </div>
)

export default App;
