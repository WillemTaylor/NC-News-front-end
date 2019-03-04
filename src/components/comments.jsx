import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  state = {
    comments: [],
    comment: [],
    username: '',
    body: '',
    commentAdded: false
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
        <h1>Comments for article {this.props.article_id}:</h1>
           <form onSubmit={this.handleAddComment}>
              <input
                 type="text"
                 placeholder="Username"
                 onChange={this.handleUsernameChange}
                 value={this.state.username}
              />
              <input
                 type="text"
                 placeholder="text"
                 onChange={this.handleBodyChange}
                 value={this.state.body}
              />
              <button>Add comment</button>
              {this.state.commentAdded && <h3>Comment added!</h3>}
           </form>
        {this.state.comments && this.state.comments.map(comment => {
           return (
              <div key={comment.comment_id}>
              <p>Article: {comment.article_id}</p>
              <p>Author: {comment.author}</p>
              <p>Text: {comment.body}</p>
              <p>Votes: {comment.votes}</p>
              <p>Date created: {comment.created_at}</p>
              <p>
                <button onClick={this.upvote}>Up-vote</button>
                <button onClick={this.downvote}>Down-vote</button>
              </p>
              {/* <p>
          <button onClick={this.handleComments}>Show comments</button>
         </p> */}
              <p>
                <button onClick={this.handleDelete}>Delete article</button>
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
         .post(`https://nc-knews1.herokuapp.com/api/articles/${
            this.props.article_id
            }/comments`, {
            username: this.state.username,
            body: this.state.body,
         })
         .then(data => {
            if (data.status === 201) this.setState({ commentAdded: true });
         })
         .catch(function (error) {
            // handle error
            console.log(error);
         });
   };

  upvote = event => {
    axios
      .patch(
        `https://nc-knews1.herokuapp.com/api/comments/${this.props.article_id}`,
        { inc_votes: 1 }
      )
      .then(res => {
         console.log(res.data)
        this.setState({ comment: res.data.comments });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  downvote = event => {
    axios
      .patch(
         `https://nc-knews1.herokuapp.com/api/comments/${this.props.article_id}`,
        { inc_votes: -1 }
      )
      .then(res => {
        this.setState({ comment: res.data.comments });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  handleDelete = event => {
    axios
      .delete(
         `https://nc-knews1.herokuapp.com/api/comments/${this.props.article_id}`
      )
      .then(res => {
        if (res.status === 204) {
          this.setState({ comment: '' });
        }
      });
  };
}

export default Comments;
