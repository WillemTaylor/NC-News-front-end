import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';

const ArticleFilter = ({ articles, filter }) => {
  const filteredArr = articles.filter(article =>
    article.topic.toLowerCase().includes(filter)
  );
  return (
    <div>
      {filteredArr.map(article => {
        return (
          <div key={article.article_id}>
            <Link
              className="link"
              id={article.article_id}
              to={`${article.article_id}`}
            >
              <p>{article.title}</p>
            </Link>
            <p>By: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>
              Date created:{' '}
              {moment(article.created_at).format('MMMM Do YYYY, h:mm:ssa')}
            </p>
            <p>Votes: {article.votes}</p>
            <p id={article}>
                Comments: {article.comment_count}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleFilter;
