import React, { Component } from 'react';
import axios from 'axios';

export default class Votes extends Component {
  state = {
    hasVoted: 0
  };

  handleVote = inc_votes => {
    axios.patch(
      `https://nc-knews1.herokuapp.com/api/comments/${this.props.id}`,
      { inc_votes }
    );
    this.setState({ hasVoted: inc_votes });
  };

  render() {
    return (
      <div>
        <button className="upvote" onClick={() => this.handleVote(1)}>
          +1
        </button>
        {this.props.votes + this.state.hasVoted}
        <button className="downvote" onClick={() => this.handleVote(-1)}>
          -1
        </button>
      </div>
    );
  }
}
