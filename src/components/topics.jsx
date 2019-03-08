import React, { Component } from 'react';
import { getTopics, addTopic } from './api';
import { navigate } from '@reach/router';
import NewTopic from './newTopic';

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
        <NewTopic
          slug={slug}
          description={description}
          topicAdded={topicAdded}
        />
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
        console.log(data.topics);
        this.setState({ topicAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };
}
