import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import moment from 'moment';
import Comments from './comments';
import Votes from './votes';

class ArticleById extends Component {
  state = {
    article: []
  };

  componentDidMount() {
    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`
      )
      .then(({ data }) => {
        this.setState({ article: data.article });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h2 id="articleTitle">Article:</h2>
        <div className="articleBody">
          <span>
            "{this.state.article.title}" {'  '}By: {this.state.article.author},
            {'  '}{' '}
            {moment(this.state.article.created_at).format(
              'MMMM Do YYYY, h:mm:ssa'
            )}
          </span>
          <p>{this.state.article.body}</p>
          {this.props.loggedIn && (
            <Votes
              votes={this.state.article.votes}
              id={this.state.article_id}
            />
          )}
          <p>
            {this.props.loggedIn && (
              <button className="deleteArticle" onClick={this.handleDelete}>
                Delete article
              </button>
            )}
          </p>
          {this.state.article && this.props.loggedIn && (
            <Comments
              loggedIn={this.props.loggedIn}
              article_id={this.props.article_id}
            />
          )}
        </div>
      </>
    );
  }

  handleDelete = event => {
    axios
      .delete(
        `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`
      )
      .then(res => {
        if (res.status === 204) {
          this.setState({ article: '' });
          navigate('/articles');
        }
      });
  };
}

export default ArticleById;
