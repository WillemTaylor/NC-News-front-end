import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: [],
    title: '',
    author: '',
    topic: '',
    body: '',
    articleAdded: false
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
        <h1>Articles:</h1>
        <form onSubmit={this.handleAddArticle}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleAuthorChange}
            value={this.state.author}
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
          {this.state.ArticleAdded && <h3>Article added!</h3>}
        </form>
        {this.state.articles &&
          this.state.articles.map(article => {
            return (
              <div key={article.article_id}>
                <p>Title: {article.title}</p>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Date created: {article.created_at}</p>
                <p>Votes: {article.votes}</p>
                <p>
                  <Link to={`${article.article_id}/comments`} id={article}>
                    Comments: {article.comment_count}
                  </Link>
                </p>
                <button>
                  <Link id={article.article_id} to={`${article.article_id}`}>
                    Show more
                  </Link>
                </button>
              </div>
            );
          })}
      </div>
    );
  }

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
        author: this.state.author,
        topic: this.state.topic,
        body: this.state.body
      })
      .then(data => {
        if (data.status === 201) this.setState({ articlesAdded: true });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
}

export default Articles;
