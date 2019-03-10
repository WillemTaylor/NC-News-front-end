import React, { Component } from 'react';
import axios from 'axios';
import ArticleFilter from './articleFilter';
import { navigate } from '@reach/router';
import { getArticles } from './api';
import NewArticle from './newArticle';

export default class Articles extends Component {
  state = {
    articles: [],
    title: '',
    author: '',
    topic: '',
    body: '',
    topicFilter: '',
    sortBy: '',
    order: ''
  };

  componentDidMount() {
    getArticles()
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(({ response }) => {
        navigate('/404', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { loggedIn } = this.props;
    const { title, topic, body, sortBy, topicFilter, articles } = this.state;
    return (
      <div>
        <input
          className="topic-filter"
          type="text"
          placeholder="Search by Topic"
          onChange={this.handleTopicFilter}
        />
        {loggedIn && (
          <NewArticle
            title={title}
            topic={topic}
            body={body}
            user={this.props.user}
            setNewArticle={this.setNewArticle}
          />
        )}
        <select value={sortBy} onChange={this.handleSort} className="dropdown">
          <option value="" defaultValue>
            Sort by
          </option>
          <option value="created_at">Date created</option>
          <option value="comment_count">Number of comments</option>
          <option value="votes">Number of votes</option>
        </select>
        <button className="asc" onClick={this.handleQuery} value="asc">
          Ascend
        </button>
        <button className="desc" onClick={this.handleQuery} value="desc">
          Descend
        </button>
        <h2 className="article-title">Articles:</h2>
        {articles && <ArticleFilter articles={articles} filter={topicFilter} />}
      </div>
    );
  }

  setNewArticle = article => {
    this.setState({ articles: [article, ...this.state.articles] });
  };

  handleTopicFilter = event => {
    this.setState({ topicFilter: event.target.value });
  };

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
      .catch(({ response }) => {
        navigate('/Err404', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}
