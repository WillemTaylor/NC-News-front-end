import React, { Component } from 'react';
import axios from 'axios';
import ArticleFilter from './articleFilter';
import { navigate } from '@reach/router';

class Articles extends Component {
  state = {
    articles: [],
    title: '',
    author: '',
    topic: '',
    body: '',
    articleAdded: false,
    topicFilter: '',
    sortBy: '',
    order: ''
  };

  componentDidMount() {
    axios
      .get('https://nc-knews1.herokuapp.com/api/articles')
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search by Topic"
          onChange={this.handleTopicFilter}
        />
        <form onSubmit={this.handleAddArticle}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <input
            type="text"
            placeholder="Topic"
            onChange={this.handleTopicChange}
            value={this.state.topic}
          />
          <input
            type="text"
            placeholder="Text"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
          <button>Add Article</button>
          {this.state.articleAdded && <h3>Article added!</h3>}
        </form>
        <form
          id="query-form"
          onSubmit={this.handleQuery}
          onChange={this.handleSort}
        >
          <select form="query-form" name="sort-by">
            <option value="" defaultValue>
              Sort by
            </option>

            <option value="created_at">Date created</option>

            <option value="comment_count">Number of comments</option>
            <option value="votes">Number of votes</option>
          </select>
          <button value="desc">Descending</button>
          <button value="asc">Ascending</button>
        </form>
        <h1>Articles:</h1>
        {this.state.articles && (
          <ArticleFilter
            articles={this.state.articles}
            filter={this.state.topicFilter}
          />
        )}
      </div>
    );
  }

  handleTopicFilter = event => {
    this.setState({ topicFilter: event.target.value });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleAuthorChange = event => {
    this.setState({ author: event.target.value });
  };

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleAddArticle = event => {
    event.preventDefault();
    axios
      .post('https://nc-knews1.herokuapp.com/api/articles', {
        title: this.state.title,
        author: this.props.user,
        topic: this.state.topic,
        body: this.state.body
      })
      .then(data => {
        if (data.status === 201) this.setState({ articleAdded: true });
      })
      .catch(({ response }) => {
        navigate('/422', { state: { data: response.data }, replace: true });
      });
  };

  handleSort = event => {
    event.preventDefault();
    console.log(event.target.value)
    this.setState({ sortBy: event.target.value });
  };

  handleQuery = event => {
    event.preventDefault();
    console.log(event.target.value)
    this.setState({ order: event.target.value })
    const { sortBy, order } = this.state;
    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles?sort_by=${sortBy}&order=${order}`
      )
      .then(({ data }) => {
        this.setState({ articles: data.articles });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export default Articles;
