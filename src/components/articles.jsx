import React, { Component } from 'react';
import axios from 'axios';
import ArticleFilter from './articleFilter';
import { navigate } from '@reach/router';
import { getArticles, addArticle } from './api';

export default class Articles extends Component {
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
    const { loggedIn } = this.props;
    const {
      hasError,
      title,
      topic,
      body,
      articleAdded,
      sortBy,
      topicFilter,
      articles
    } = this.state;
    if (hasError) return <h3>Cannot get articles</h3>;
    else
      return (
        <div>
          <input
            className="topic-filter"
            type="text"
            placeholder="Search by Topic"
            onChange={this.handleTopicFilter}
          />
          {loggedIn && (
            <form className="article-form" onSubmit={this.handleAddArticle}>
              <input
                className="title-form"
                type="text"
                placeholder="Title"
                onChange={this.handleTitleChange}
                value={title}
                required
              />
              <input
                className="article-topic"
                type="text"
                placeholder="Topic"
                onChange={this.handleTopicChange}
                value={topic}
                required
              />
              <input
                className="text-form"
                type="text"
                placeholder="Text"
                onChange={this.handleBodyChange}
                value={body}
                required
              />
              <button className="addArticle">Add Article</button>
              {articleAdded && <h3 className="addedArticle">Article added!</h3>}
            </form>
          )}
          <select
            value={sortBy}
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
            Ascend
          </button>
          <button className="desc" onClick={this.handleQuery} value="desc">
            Descend
          </button>
          <h2 className="article-title">Articles:</h2>
          {articles && (
            <ArticleFilter articles={articles} filter={topicFilter} />
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
      .then(({ data }) => {
        console.log(data);
        this.setState({ articleAdded: true });
        navigate(`/articles/${data.article.article_id}`);
      })
      .catch(({ response }) => {
        navigate('/400', {
          state: { data: response.data },
          replace: true
        });
      });
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
