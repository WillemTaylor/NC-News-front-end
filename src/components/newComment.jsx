import React, { Component } from 'react';
import { addComment } from './api';
import { navigate } from '@reach/router';

export default class NewComment extends Component {
  state = {
    username: '',
    body: ''
  };

  render() {
    return (
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
      </form>
    );
  }

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddComment = event => {
    event.preventDefault();
    addComment(this.props.article_id, {
      username: this.props.user,
      body: this.state.body
    })
      .then(({ data }) => {
        this.props.setNewComment(data.comment);
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };
}
