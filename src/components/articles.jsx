import React, { Component } from 'react';
import axios from 'axios';
import ArticleFilter from './articleFilter';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: [],
    title: '',
    author: '',
    topic: '',
    body: '',
    articleAdded: false,
    topicFilter: ''
  };

  componentDidMount() {
    axios
      .get('https://nc-knews1.herokuapp.com/api/articles')
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Articles:</h1>
        <input
          type="text"
          placeholder="Search by Topic"
          onChange={this.handleTopicFilter}
        />
        <form onSubmit={this.handleAddArticle}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleAuthorChange}
            value={this.state.author}
          />
          <input
            type="text"
            placeholder="Topic"
            onChange={this.handleTopicChange}
            value={this.state.topic}
          />
          <input
            type="text"
            placeholder="Text"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
          <button>Add Article</button>
          {this.state.ArticleAdded && <h3>Article added!</h3>}
        </form>
        <select>
          <option value="" disabled selected>
            Sort by
          </option>

          <option value="created_at">Date created
          </option>

          <option value="comment_count">Number of comments</option>
          <option value="votes">Number of votes</option>
        </select>
        <button onClick={this.handleSortByDesc}>
          Descending
          </button>
        <button onClick={this.handleSortByAsc}>
         Ascending
        </button>

        {this.state.articles && (
          <ArticleFilter
            articles={this.state.articles}
            filter={this.state.topicFilter}
          />
        )}
      </div>
    );
  }

  handleTopicFilter = event => {
    this.setState({ topicFilter: event.target.value });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleAuthorChange = event => {
    this.setState({ author: event.target.value });
  };

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddArticle = event => {
    event.preventDefault();
    axios
      .post('https://nc-knews1.herokuapp.com/api/articles', {
        title: this.state.title,
        author: this.state.author,
        topic: this.state.topic,
        body: this.state.body
      })
      .then(data => {
        if (data.status === 201) this.setState({ articlesAdded: true });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  handleSortByAsc = event => {
    event.preventDefault();
    axios
      .get('https://nc-knews1.herokuapp.com/api/articles?sort_by&order=asc')
      .then(({ data }) => {
        this.setState({articles: data.articles})
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  handleSortByDesc = event => {
    event.preventDefault();
    axios
      .get('https://nc-knews1.herokuapp.com/api/articles?sort_by&order=desc')
      .then(({ data }) => {
        this.setState({articles: data.articles})
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export default Articles;
