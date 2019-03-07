import React, { Component } from 'react';
import moment from 'moment';
import Votes from './votes';
import axios from 'axios';

class Comment extends Component {
  state = {
    deleted: false
  };

  render() {
    const { comment } = this.props;
    return (
      <>
        {!this.state.deleted && (
          <div
            className="articleBody1"
            key={comment.comment_id}
            id={comment.comment_id}
          >
            <p>
              Author: {comment.author},{' '}
              {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ssa')}
            </p>
            <p className="commentBody">{comment.body}</p>
            {this.props.loggedIn && (
              <Votes votes={comment.votes} id={comment.comment_id} />
            )}
            {this.props.loggedIn && (
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
    axios
      .delete(
        `https://nc-knews1.herokuapp.com/api/comments/${this.props.article_id}`
      )
      .then(() => {
        this.setState({ deleted: true });
      });
  };
}
export default Comment;
