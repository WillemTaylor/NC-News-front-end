import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default class Delete extends Component {
  state = {
    comment: ''
  };

  handleDelete = () => {
    axios.delete(
      `https://nc-knews1.herokuapp.com/api/comments/${this.props.id}`
    );
    this.setState({ comment: '' });
    navigate(`/articles/${this.props.article_id}`);
  };

  render() {
    return (
      <div>
        <button className="deleteComment" onClick={() => this.handleDelete()}>
          Delete comment
        </button>
      </div>
    );
  }
}
