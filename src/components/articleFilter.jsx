import React from 'react';
import { Link } from '@reach/router';

const ArticleFilter = ({ articles, filter }) => {
  const filteredArr = articles.filter(article =>
    article.topic.toLowerCase().includes(filter)
  );
  return (
    <div>
      {filteredArr.map(article => {
        return (
          <div key={article.article_id}>
            <Link id={article.article_id} to={`${article.article_id}`}>
              <p>{article.title}</p>
            </Link>
            <p>By: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>Date created: {article.created_at}</p>
            <p>Votes: {article.votes}</p>
            <p>
              <Link to={`${article.article_id}/comments`} id={article}>
                Comments: {article.comment_count}
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleFilter;
