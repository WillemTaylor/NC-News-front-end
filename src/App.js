import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './components/topics';
import Articles from './components/articles';
import ArticleById from './components/articleById';
import Users from './components/users';
import UserDetails from './components/userDetails';
import Home from './components/Home';
import logo from './logo.jpeg';
import { Err400, Err404, Err422, NoMatch } from './components/error';
import { getUsers } from './components/api';

class App extends Component {
  state = {
    users: [],
    user: '',
    loggedIn: false,
    showLogin: true
  };

  componentDidMount() {
    getUsers().then(({ data }) => {
      this.setState({ users: data.users });
    });
  }

  render() {
    const { user, loggedIn, showLogin } = this.state;
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
          <Home
            path="/"
            user={user}
            loggedIn={loggedIn}
            showLogin={showLogin}
            handleLogin={this.handleLogin}
          />
          <Topics path="/topics" />
          <Articles path="/articles" user={user} loggedIn={loggedIn} />
          <ArticleById
            path="/articles/:article_id"
            user={user}
            loggedIn={loggedIn}
          />
          <Users path="/users" />
          <UserDetails path="/users/:username" />
          <Err400 path="/400" />
          <Err422 path="/422" />
          <Err404 path="/404" />
          <NoMatch default />
        </Router>
      </div>
    );
  }

  handleLogin = event => {
    const randomUser = Math.floor(Math.random() * 6);
    event.preventDefault();
    this.setState({
      loggedIn: true,
      user: this.state.users[randomUser].username,
      showLogin: false
    });
  };
}

export default App;
