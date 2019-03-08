import React, { Component } from 'react';
import { getTopics, addTopic } from './api';
import { navigate } from '@reach/router';

export default class Topics extends Component {
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
      .catch(({ response }) => {
        navigate('/NoMatch', {
          state: { data: response.data },
          replace: true
        });
      });
  }

  render() {
    const { slug, description, topicAdded, topics } = this.state;
    return (
      <div>
        <span className="form">
          <form onSubmit={this.handleAddTopic}>
            <input
              className="topic-form"
              type="text"
              placeholder="Topic"
              onChange={this.handleSlugChange}
              value={slug}
              required
            />
            <input
              className="desc-form"
              type="text"
              placeholder="Description"
              onChange={this.handleDescriptionChange}
              value={description}
              required
            />
            <button className="addTopic">Add Topic</button>
            {topicAdded && <h3 className="addedTopic">Topic added!</h3>}
          </form>
        </span>
        <h1 className="topics-title">Topics:</h1>
        {topics &&
          topics.map(topic => {
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
        this.setState({ topicAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };
}
