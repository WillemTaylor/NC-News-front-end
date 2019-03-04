import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    axios.get('https://nc-knews1.herokuapp.com/api/articles')
    .then(({ data }) => {
       this.setState({ articles: data.articles })
    })
    .catch(function (error) {
         // handle error
         console.log(error);
    });
  }

  render() {
     return (
        <div>
           <h1>Articles:</h1>
           {this.state.articles && this.state.articles.map(article => {
              return (
                  <div key={article.article_id}>
                     <p>Title: {article.title}</p>
                     <p>Votes: {article.votes}</p>
                     <p>Topic: {article.topic}</p>
                     <p>Author: {article.author}</p>
                     <p>Date created: {article.created_at}</p>
                     <p>
                        <Link to={`${article.article_id}/comments`} id={article}>Comments: {article.comment_count}</Link>
                     </p>
                     <button>
                       <Link id={article.article_id} to={`${article.article_id}`}>Show more</Link>
                     </button>
                  </div>
               )
            })}
         </div>
      )
   }
}

export default Articles;
