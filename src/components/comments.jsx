import React, { Component } from 'react';
import { navigate } from '@reach/router';
import Comment from './comment';
import { getComments, postComment } from './api';

export default class Comments extends Component {
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
      .catch(({ response }) => {
        navigate('/NoMatch', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { loggedIn, article_id, user } = this.props;
    const { body, commentAdded, comments } = this.state;
    return (
      <div>
        {loggedIn && (
          <form onSubmit={this.handleAddComment}>
            <input
              className="commentText"
              type="text"
              placeholder="Text"
              onChange={this.handleBodyChange}
              value={body}
              required
            />
            <button className="addComment">Add comment</button>
            {commentAdded && <h3 className="addedComment">Comment added!</h3>}
          </form>
        )}
        {article_id &&
          comments.map(comment => {
            return (
              <Comment
                user={user}
                loggedIn={loggedIn}
                key={comment.comment_id}
                comment={comment}
                article_id={article_id}
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
