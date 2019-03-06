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
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: '',
    loggedIn: false,
    showLogin: true
  };

  componentDidMount() {
    axios.get('https://nc-knews1.herokuapp.com/api/users').then(({ data }) => {
      this.setState({ users: data.users });
    });
  }
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
          <Home
            path="/"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
            showLogin={this.state.showLogin}
            handleLogin={this.handleLogin}
          />
          <Topics path="/topics" />
          <Articles
            path="/articles"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <ArticleById
            path="/articles/:article_id"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <Users path="/users" />
          <UserDetails path="/users/:username" />
          <Err400 path="/400" />
          <Err422 path="/422" />
          <NoMatch default />
        </Router>
      </div>
    );
  }
  handleLogin = event => {
    const randomUser = 2;
    event.preventDefault();
    this.setState({
      loggedIn: true,
      user: this.state.users[randomUser].username,
      showLogin: false
    });
  };
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
