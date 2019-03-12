import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Topics from './components/topics';
import Articles from './components/articles';
import ArticleById from './components/articleById';
import Users from './components/users';
import UserDetails from './components/userDetails';
import Home from './components/Home';
import background from './background.jpeg';
import { Err400, Err404, Err422, NoMatch } from './components/error';
import { getUsers } from './components/api';
import NavBar from './components/nav';

class App extends Component {
  state = {
    users: [],
    user: '',
    loggedIn: false
  };

  componentDidMount() {
    getUsers().then(({ data }) => {
      this.setState({ users: data.users });
    });
  }

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div className="App">
        <img className="image" src={background} alt="background" />
        <NavBar />
        <Router>
          <Home
            path="/"
            user={user}
            loggedIn={loggedIn}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
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
    const randomUser = Math.floor(Math.random() * this.state.users.length);
    event.preventDefault();
    this.setState({
      loggedIn: true,
      user: this.state.users[randomUser].username
    });
  };

  handleLogout = event => {
    event.preventDefault();
    this.setState({
      loggedIn: false,
      user: ''
    });
  };
}

export default App;
