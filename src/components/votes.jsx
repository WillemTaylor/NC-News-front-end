import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default class Votes extends Component {
  state = {
    hasVoted: 0
  };

  handleVote = inc_votes => {
    axios
      .patch(`https://nc-knews1.herokuapp.com/api/${this.props.type}/${this.props.id}`, {
        inc_votes
      })
      .then(() => {
        this.setState({ hasVoted: this.state.hasVoted + inc_votes });
      })
      .catch(({ response }) => {
        navigate('/404', {
          state: { data: response.data },
          replace: true
        });
      });
  };

  render() {
    return (
      <div className="voter">
        <button
          disabled={this.state.hasVoted > 0}
          className="upvote"
          onClick={() => this.handleVote(1)}
        >
          +1
        </button>
        {this.props.votes + this.state.hasVoted}
        <button
          disabled={this.state.hasVoted < 0}
          className="downvote"
          onClick={() => this.handleVote(-1)}
        >
          -1
        </button>
      </div>
    );
  }
}
