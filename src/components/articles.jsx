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
    order: '',
    hasError: false
  };

  componentDidMount() {
    getArticles()
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(error => {
        this.setState({ hasError: true });
      });
  }

  render() {
    if (this.state.hasError) return <h3>Cannot get articles</h3>;
    else
      return (
        <div>
          <input
            className="topic-filter"
            type="text"
            placeholder="Search by Topic"
            onChange={this.handleTopicFilter}
          />
          {this.props.loggedIn && (
            <form className="article-form" onSubmit={this.handleAddArticle}>
              <input
                className="username-form"
                type="text"
                placeholder="Title"
                onChange={this.handleTitleChange}
                value={this.state.title}
                required
              />
              <input
                className="name-form"
                type="text"
                placeholder="Topic"
                onChange={this.handleTopicChange}
                value={this.state.topic}
                required
              />
              <input
                className="avatar-form"
                type="text"
                placeholder="Text"
                onChange={this.handleBodyChange}
                value={this.state.body}
                required
              />
              <button className="addArticle">Add Article</button>
              {this.state.articleAdded && (
                <h3 className="addedArticle">Article added!</h3>
              )}
            </form>
          )}
          <div id="query-form">
            <select
              value={this.state.sortBy}
              onChange={this.handleSort}
              className="dropdown"
            >
              <option value="" defaultValue>
                Sort by
              </option>

              <option value="created_at">Date created</option>

              <option value="comment_count">Number of comments</option>
              <option value="votes">Number of votes</option>
            </select>
            <button className="asc" onClick={this.handleQuery} value="asc">
              Ascending
            </button>
            <button className="desc" onClick={this.handleQuery} value="desc">
              Descending
            </button>
          </div>
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
  handleSort = event => {
    event.preventDefault();
    this.setState({ sortBy: event.target.value });
  };

  handleQuery = event => {
    event.preventDefault();
    const order = event.target.value;
    const { sortBy } = this.state;

    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles?sort_by=${sortBy}&order=${order}`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles, order: order });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

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
        this.setState({ articleAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}

export default Articles;
