import React, { Component } from 'react';
import ArticleFilter from './articleFilter';
import { navigate } from '@reach/router';
import { getArticles } from './api';
import NewArticle from './newArticle';
import ArticleQueries from './articleQueries';

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
    const { title, topic, body, topicFilter, articles } = this.state;
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
        <ArticleQueries setArticleQuery={this.setArticleQuery} />
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

  setArticleQuery = (articles, display) => {
    this.setState({ articles: articles, order: display });
  };
}
