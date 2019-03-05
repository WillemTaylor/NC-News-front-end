import React, { Component } from 'react';
import axios from 'axios';

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
        <h1>Article:</h1>
        <span>
          "{this.state.article.title}" 
          By: {this.state.article.author}
        </span>
        <p>Date created: {this.state.article.created_at}</p>
        <p>{this.state.article.body}</p>
        <span>
          Votes: <button onClick={this.upvote}>+1</button> {this.state.article.votes}
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
        }
      });
  };
}

export default ArticleById;
