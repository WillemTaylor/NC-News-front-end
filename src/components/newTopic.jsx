import React, { Component } from 'react';
import { addTopic } from './api';
import { navigate } from '@reach/router';

export default class NewTopic extends Component {
  state = {
    slug: '',
    description: ''
  };

  render() {
    return (
      <span className="form">
        <form onSubmit={this.handleAddTopic}>
          <input
            className="topic-form"
            type="text"
            placeholder="Topic"
            onChange={this.handleSlugChange}
            value={this.state.slug}
            required
          />
          <input
            className="desc-form"
            type="text"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
            required
          />
          <button type="submit" className="addTopic">
            Add Topic
          </button>
        </form>
      </span>
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
      .then(({ data }) => {
        this.props.setNewTopic(data.topic);
        this.setState({
          slug: '',
          description: ''
        });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };
}
