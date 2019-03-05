import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import moment from 'moment';

class Comments extends Component {
  state = {
    comments: [],
    username: '',
    body: '',
    commentAdded: false,
    votes: ''
  };

  componentDidMount() {
    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles/${
          this.props.article_id
        }/comments`
      )
      .then(({ data }) => {
        this.setState({ comments: data.comments });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2 id="title">Comments for article {this.props.article_id}:</h2>
        <form onSubmit={this.handleAddComment}>
          <input
            type="text"
            placeholder="Text"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
          <button>Add comment</button>
          {this.state.commentAdded && <h3>Comment added!</h3>}
        </form>
        {this.state.comments &&
          this.state.comments.map(comment => {
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
          })}
      </div>
    );
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddComment = event => {
    event.preventDefault();
    axios
      .post(
        `https://nc-knews1.herokuapp.com/api/articles/${
          this.props.article_id
        }/comments`,
        {
          username: this.props.user,
          body: this.state.body
        }
      )
      .then(data => {
        if (data.status === 201) this.setState({ commentAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };

  upvote = event => {
    event.preventDefault();
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/comments/${event.target.id}`,
        { inc_votes: 1 }
      )
      .then(res => {
        console.log(res.data.comment.votes);
        this.setState({ votes: res.data.comment.votes });
        //navigate(`/articles/${this.props.article_id}/comments`);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  downvote = event => {
    event.preventDefault();
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/comments/${event.target.id}`,
        { inc_votes: -1 }
      )
      .then(res => {
        console.log(res.data.comment.votes);
        this.setState({ votes: res.data.comment.votes });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`https://nc-knews1.herokuapp.com/api/comments/${event.target.id}`)
      .then(res => {
        if (res.status === 204) {
          this.setState({ comment: '' });
          navigate(`/articles/`);
        }
      });
  };
}

export default Comments;
