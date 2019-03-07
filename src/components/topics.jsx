import React, { Component } from 'react';
import { getTopics, addTopic } from './api';

class Topics extends Component {
  state = {
    topics: [],
    slug: '',
    description: '',
    topicAdded: false
  };

  componentDidMount() {
    getTopics()
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleAddTopic}>
          <input
            className="topic-form"
            type="text"
            placeholder="Topic"
            onChange={this.handleSlugChange}
            value={this.state.slug}
          />
          <input
            className="desc-form"
            type="text"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
          />
          <button className="addTopic">Add Topic</button>
          {this.state.topicAdded && (
            <h3 className="addedTopic">Topic added!</h3>
          )}
        </form>
        <h1 id="title">Topics:</h1>
        {this.state.topics &&
          this.state.topics.map(topic => {
            return (
              <div key={topic.slug}>
                <p className="topic">Topic: {topic.slug}</p>
                <p className="topic-items">Description: {topic.description}</p>
              </div>
            );
          })}
      </div>
    );
  }

  handleSlugChange = event => {
    this.setState({ slug: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleAddTopic = event => {
    event.preventDefault();
    addTopic({
      slug: this.state.slug,
      description: this.state.description
    })
      .then(data => {
        if (data.status === 201) this.setState({ topicAdded: true });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
}

export default Topics;
