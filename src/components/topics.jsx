import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Topics extends Component {
  state = {
    topics: [],
    slug: '',
    description: '',
    topicAdded: false
  };

  componentDidMount() {
    axios
      .get('https://nc-knews1.herokuapp.com/api/topics')
      .then(({ data }) => {
        this.setState({ topics: data.topics });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Topics:</h1>
        <form onSubmit={this.handleAddTopic}>
          <input
            type="text"
            placeholder="Topic"
            onChange={this.handleSlugChange}
            value={this.state.slug}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
          />
          <button>Add Topic</button>
          {this.state.topicAdded && <h3>Topic added!</h3>}
        </form>
        {this.state.topics &&
          this.state.topics.map(topic => {
            return (
              <div key={topic.slug}>
                <p>
                  Topic: <Link to={'/articles'}>{topic.slug}</Link>
                </p>

                <p>Description: {topic.description}</p>
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
    axios
      .post('https://nc-knews1.herokuapp.com/api/topics', {
        slug: this.state.slug,
        description: this.state.description
      })
      .then(data => {
        if (data.status === 201) this.setState({ topicAdded: true });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export default Topics;
