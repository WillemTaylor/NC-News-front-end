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
        <p>ID: {this.state.article.article_id}</p>
        <p>Title: {this.state.article.title}</p>
        <p>Author: {this.state.article.author}</p>
        <p>Topic: {this.state.article.topic}</p>
        <p>Text: {this.state.article.body}</p>
        <p>Comments: {this.state.article.comment_count}</p>
        <p>Date created: {this.state.article.created_at}</p>
        <p>Votes: {this.state.article.votes}</p>
        <p>
          <button onClick={this.upvote}>Up-vote</button>
          <button onClick={this.downvote}>Down-vote</button>
        </p>
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
        `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: 1}
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
         `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: -1 }
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
    axios.delete(
      `https://nc-knews1.herokuapp.com/api/articles/${this.props.article_id}`)
      .then((res) => {
         if (res.status === 204) {
            this.setState({ article: '' })
         }
      })
  };
}

export default ArticleById;
