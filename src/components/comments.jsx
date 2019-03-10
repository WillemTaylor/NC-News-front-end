import React, { Component } from 'react';
import { navigate } from '@reach/router';
import Comment from './comment';
import { getComments } from './api';
import NewComment from './newComment';

export default class Comments extends Component {
  state = {
    comments: [],
    username: '',
    body: ''
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
    const { body, comments } = this.state;
    return (
      <div>
        {loggedIn && (
          <NewComment
            user={user}
            body={body}
            article_id={article_id}
            setNewComment={this.setNewComment}
          />
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

  setNewComment = comment => {
    this.setState({ comments: [comment, ...this.state.comments] });
  };
}
