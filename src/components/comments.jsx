import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Comment from './comment';
import { getComments, postComment } from './api';

class Comments extends Component {
  state = {
    comments: [],
    username: '',
    body: '',
    commentAdded: false
  };

  componentDidMount() {
    getComments(this.props.article_id)
      .then(({ data }) => {
        this.setState({ comments: data.comments });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    console.log(this.props.loggedIn);
    return (
      <div>
        {this.props.loggedIn && (
          <form onSubmit={this.handleAddComment}>
            <input
              className="commentText"
              type="text"
              placeholder="Text"
              onChange={this.handleBodyChange}
              value={this.state.body}
              required
            />
            <button className="addComment">Add comment</button>
            {this.state.commentAdded && (
              <h3 className="addedComment">Comment added!</h3>
            )}
          </form>
        )}
        {this.props.article_id &&
          this.state.comments.map(comment => {
            return (
              <Comment
                loggedIn={this.props.loggedIn}
                key={comment.comment_id}
                comment={comment}
                article_id={this.props.article_id}
              />
            );
          })}
      </div>
    );
  }

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddComment = event => {
    event.preventDefault();
    postComment(this.props.article_id, {
      username: this.props.user,
      body: this.state.body
    })
      .then(data => {
        if (data.status === 201) this.setState({ commentAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };
}

export default Comments;
