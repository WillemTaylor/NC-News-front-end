import React, { Component } from 'react';
import moment from 'moment';
import Votes from './votes';
import Delete from './delete';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div key={comment.comment_id} id={comment.comment_id}>
        <p>
          Author: {comment.author},{' '}
          {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ssa')}
        </p>
        <p>{comment.body}</p>
        {!this.props.loggedIn && (
          <Votes votes={comment.votes} id={comment.comment_id} />
        )}
        <Delete
          comment={comment}
          id={comment.comment_id}
          article_id={this.props.article_id}
        />
      </div>
    );
  }
}
export default Comment;
