import React, { Component } from 'react';
import moment from 'moment';

class Comment extends Component {
  state = {};
  render() {
    const { comment } = this.props;
    return (
      <div key={comment.comment_id} id={comment.comment_id}>
        <p>Author: {comment.author}</p>
        <p>
          Date created:{' '}
          {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ssa')}
        </p>
        <p>{comment.body}</p>
        <span>
          Votes:
          <button onClick={this.upvote} id={comment.comment_id}>
            +1
          </button>
          {comment.votes}
          <button onClick={this.downvote} id={comment.comment_id}>
            -1
          </button>
        </span>
        <p>
          <button onClick={this.handleDelete} id={comment.comment_id}>
            Delete comment
          </button>
        </p>
      </div>
    );
  }
}
export default Comment;
