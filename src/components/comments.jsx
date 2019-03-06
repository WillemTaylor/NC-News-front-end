import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Comment from './comment';

class Comments extends Component {
  state = {
    comments: [],
    username: '',
    body: '',
    commentAdded: false,
    sentVoteCount: 0,
    comment: ''
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
        {!this.props.loggedIn && (
          <form onSubmit={this.handleAddComment}>
            <input
              className="commentText"
              type="text"
              placeholder="Text"
              onChange={this.handleBodyChange}
              value={this.state.body}
            />
            <button className="addComment">Add comment</button>
            {this.state.commentAdded && (
              <h3 className="addedComment">Comment added!</h3>
            )}
          </form>
        )}
        {this.props.article_id &&
          this.state.comments.map(comment => {
            return <Comment key={comment.comment_id} comment={comment} />;
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
    console.log(event.target);
    event.preventDefault();
    axios.patch(
      `https://nc-knews1.herokuapp.com/api/comments/${event.target.id}`,
      { inc_votes: 1 }
    );
    // .then(() => {
    this.setState(prevState => {
      return { sentVoteCount: prevState.sentVoteCount + 1 };
    });
    // navigate(`/articles/${this.props.article_id}`);
    // })
    // .catch(error => {
    //   // handle error
    //   console.log(error);
    // });
  };

  // <button onClick={() => this.upvote(1)}>up-vote</button>
  // <button onClick={() => this.downvote(-1)}>down-vote</button>
  // upvote = () => {
  //   patchCommentVotes(this.state.comments.comment_id, voteChange).then(() => {
  //   this.setState(prevState => ({ comments: {...prevState.comments, votes: prevState.comments.votes + voteChange})
  // })
  // }

  downvote = event => {
    // const comment = this.state.comments
    //   .map(x => x.comment_id == event.target.id)
    //   .findIndex(x => x === true);
    event.preventDefault();
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/comments/${event.target.id}`,
        { inc_votes: -1 }
      )
      .then(res => {
        console.log(res.data.comments.votes);
        this.setState({ comments: res.data.comments.votes });
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
          navigate(`/articles/${this.props.article_id}`);
        }
      });
  };
}

export default Comments;
