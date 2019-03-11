import React, { Component } from 'react';
import { navigate } from '@reach/router';
import moment from 'moment';
import Comments from './comments';
import Votes from './votes';
import { getArticleById, deleteArticle } from './api';

export default class ArticleById extends Component {
  state = {
    article: []
  };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(({ data }) => {
        this.setState({ article: data.article });
      })
      .catch(({ response }) => {
        navigate('/Err400', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { loggedIn, user, article_id } = this.props;
    const { article } = this.state;
    return (
      <>
        <h2 className="article-title1">Article:</h2>
        <div className="articleBody">
          <span className="articleInfo">
            "{article.title}" {'  '}By: {article.author},{'  '}{' '}
            {moment(article.created_at).format('MMMM Do YYYY, h:mm:ssa')}
          </span>
          <p className="articleText">{article.body}</p>
          {loggedIn && <Votes votes={article.votes} id={article_id} />}
          <p>
            {loggedIn && article.author === user && (
              <button className="deleteArticle" onClick={this.handleDelete}>
                Delete article
              </button>
            )}
          </p>
          {article && (
            <Comments user={user} loggedIn={loggedIn} article_id={article_id} />
          )}
        </div>
      </>
    );
  }

  handleDelete = event => {
    deleteArticle(this.props.article_id).then(res => {
      this.setState({ article: '' });
      navigate('/articles');
    });
  };
}
