import React, { Component } from 'react';

export default class NewTopic extends Component {
  render() {
    return (
      <span className="form">
        <form onSubmit={this.handleAddTopic}>
          <input
            className="topic-form"
            type="text"
            placeholder="Topic"
            onChange={this.handleSlugChange}
            required
          />
          <input
            className="desc-form"
            type="text"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            required
          />
          <button className="addTopic">Add Topic</button>
          {this.props.topicAdded && (
            <h3 className="addedTopic">Topic added!</h3>
          )}
        </form>
      </span>
    );
  }
}
