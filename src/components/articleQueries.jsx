import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default class ArticleQueries extends Component {
  state = {
    sortBy: ''
  };

  render() {
    return (
      <div>
        <select
          value={this.state.sortBy}
          onChange={this.handleSort}
          className="dropdown"
        >
          <option value="" defaultValue>
            Sort by
          </option>
          <option value="created_at">Date created</option>
          <option value="comment_count">Number of comments</option>
          <option value="votes">Number of votes</option>
        </select>
        <button className="asc" onClick={this.handleQuery} value="asc">
          ▲
        </button>
        <button className="desc" onClick={this.handleQuery} value="desc">
          ▼
        </button>
      </div>
    );
  }

  handleSort = event => {
    event.preventDefault();
    this.setState({ sortBy: event.target.value });
  };

  handleQuery = event => {
    event.preventDefault();
    const order = event.target.value;
    const { sortBy } = this.state;
    axios
      .get(
        `https://nc-knews1.herokuapp.com/api/articles?sort_by=${sortBy}&order=${order}`
      )
      .then(({ data }) => {
        this.props.setArticleQuery(data.articles, order);
      })
      .catch(({ response }) => {
        navigate('/Err404', {
          state: { data: response.data },
          replace: true
        });
      });
  };
}
