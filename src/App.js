import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Topics from './components/topics';
import Articles from './components/articles';
import ArticleById from './components/articleById';
import Users from './components/users';
import UserDetails from './components/userDetails';
import Comments from './components/comments';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: '',
    loggedIn: false
  };

  componentDidMount() {
    axios.get('https://nc-knews1.herokuapp.com/api/users').then(({ data }) => {
      this.setState({ users: data.users });
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to NC News {this.state.user}!</h1>
        <button onClick={this.handleLogin}>Log in</button>
        {this.state.loggedIn}
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/topics">
            <button>Topics</button>
          </Link>
          <Link to="/articles">
            <button>Articles</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
        </nav>
        <Router>
          <Home path="/" user={this.state.user} />
          <Topics path="/topics" />
          <Articles path="/articles" user={this.state.user} />
          <ArticleById path="/articles/:article_id" user={this.state.user} />
          <Comments
            path="/articles/:article_id/comments"
            user={this.state.user}
          />
          <Users path="/users" user={this.state.user} />
          <UserDetails path="/users/:username" user={this.state.user} />
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
      user: this.state.users[randomUser].username
    });
  };
}

const Home = () => <div />;

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
