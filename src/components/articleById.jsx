import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import moment from 'moment';

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
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2 id="title">Article:</h2>
        <span>
          "{this.state.article.title}" By: {this.state.article.author}
        </span>
        <p>
          Date created: {moment(this.state.article.created_at).format('MMMM Do YYYY, h:mm:ssa')}
        </p>
        <p>{this.state.article.body}</p>
        <span>
          Votes: <button onClick={this.upvote}>+1</button>{' '}
          {this.state.article.votes}
          <button onClick={this.downvote}>-1</button>
        </span>
        {/* <p>
          <button onClick={this.handleComments}>Show comments</button>
        </p> */}
        <p>
          <button onClick={this.handleDelete}>Delete article</button>
        </p>
      </div>
    );
  }

  upvote = event => {
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`,
        { inc_votes: 1 }
      )
      .then(res => {
        this.setState({ article: res.data.article });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  downvote = event => {
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`,
        { inc_votes: -1 }
      )
      .then(res => {
        this.setState({ article: res.data.article });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

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
