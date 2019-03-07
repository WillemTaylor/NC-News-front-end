import React, { Component } from 'react';
import axios from 'axios';
import ArticleFilter from './articleFilter';
import { navigate } from '@reach/router';
import { getArticles, addArticle } from './api';

class Articles extends Component {
  state = {
    articles: [],
    title: '',
    author: '',
    topic: '',
    body: '',
    articleAdded: false,
    topicFilter: '',
    sortBy: '',
    order: ''
  };

  componentDidMount() {
    getArticles()
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <input
          className="topic-filter"
          type="text"
          placeholder="Search by Topic"
          onChange={this.handleTopicFilter}
        />
        {!this.props.loggedIn && (
          <form className="article-form" onSubmit={this.handleAddArticle}>
            <input
              className="user-form"
              type="text"
              placeholder="Title"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <input
              className="name-form"
              type="text"
              placeholder="Topic"
              onChange={this.handleTopicChange}
              value={this.state.topic}
            />
            <input
              className="avatar-form"
              type="text"
              placeholder="Text"
              onChange={this.handleBodyChange}
              value={this.state.body}
            />
            <button className="addArticle">Add Article</button>
            {this.state.articleAdded && (
              <h3 className="addedArticle">Article added!</h3>
            )}
          </form>
        )}
        <form id="query-form" onChange={this.handleSort}>
          <select className="dropdown" form="query-form" name="sort-by">
            <option value="" defaultValue>
              Sort by
            </option>

            <option value="created_at">Date created</option>

            <option value="comment_count">Number of comments</option>
            <option value="votes">Number of votes</option>
          </select>
          <button className="desc" onSubmit={this.handleQuery} value="desc">
            Descending
          </button>
          <button className="asc" onSubmit={this.handleQuery} value="asc">
            Ascending
          </button>
        </form>
        <h2 id="title">Articles:</h2>
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

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddArticle = event => {
    event.preventDefault();
    addArticle({
      title: this.state.title,
      author: this.props.user,
      topic: this.state.topic,
      body: this.state.body
    })
      .then(data => {
        if (data.status === 201) this.setState({ articleAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };

  handleSort = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ sortBy: event.target.value });
  };

  handleQuery = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ order: event.target.value });
    const { sortBy, order } = this.state;
    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles?sort_by=${sortBy}&order=${order}`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
}

export default Articles;
