import React, { Component } from 'react';
import moment from 'moment';
import Votes from './votes';
import { deleteComment } from './api';

export default class Comment extends Component {
  state = {
    deleted: false
  };

  render() {
    const { comment, user } = this.props;
    return (
      <>
        {!this.state.deleted && (
          <div
            className="commentBody"
            key={comment.comment_id}
            id={comment.comment_id}
          >
            <br />
            Author: {comment.author},{' '}
            {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ssa')}
            <br />
            <br />
            <br />
            <p className="commentBody1">{comment.body}</p>
            {this.props.loggedIn && (
              <Votes votes={comment.votes} id={comment.comment_id} />
            )}
            {this.props.loggedIn && user === comment.author && (
              <button
                className="deleteComment"
                onClick={() => this.handleDelete()}
              >
                Delete comment
              </button>
            )}
          </div>
        )}
      </>
    );
  }

  handleDelete = () => {
    deleteComment(this.props.article_id).then(() => {
      this.setState({ deleted: true });
    });
  };
}
