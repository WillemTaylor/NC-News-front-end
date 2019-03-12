import React, { Component } from 'react';
import { addArticle } from './api';
import { navigate } from '@reach/router';

export default class NewArticle extends Component {
  state = {
    title: '',
    author: '',
    topic: '',
    body: ''
  };

  render() {
    return (
      <>
        <form className="article-form" onSubmit={this.handleAddArticle}>
          <input
            className="title-form"
            type="text"
            placeholder="Title"
            onChange={this.handleTitleChange}
            value={this.state.title}
            required
          />
          <input
            className="article-topic"
            type="text"
            placeholder="Topic"
            onChange={this.handleTopicChange}
            value={this.state.topic}
            required
          />
          <button className="addArticle">Add Article</button>
        </form>
        <textarea
          rows="2"
          cols="40"
          className="text-form"
          placeholder="Text"
          onChange={this.handleBodyChange}
          value={this.state.body}
          required
        />
      </>
    );
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddArticle = event => {
    event.preventDefault();
    addArticle({
      title: this.state.title,
      author: this.props.user,
      topic: this.state.topic,
      body: this.state.body
    })
      .then(({ data }) => {
        this.props.setNewArticle(data.article);
        this.setState({
          title: '',
          author: '',
          topic: '',
          body: ''
        });
      })
      .catch(({ response }) => {
        navigate('/NoMatch', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}
