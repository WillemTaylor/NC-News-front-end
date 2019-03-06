import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';

const ArticleFilter = ({ articles, filter }) => {
  const filteredArr = articles.filter(article =>
    article.topic.toLowerCase().includes(filter)
  );
  return (
    <div className="article-list">
      {filteredArr.map(article => {
        return (
          <div className="article-items" key={article.article_id}>
            <Link
              className="link"
              id={article.article_id}
              to={`${article.article_id}`}
            >
              <p className="articleTitle">{article.title}</p>
            </Link>
            <p className="articleBy">By: {article.author}</p>
            <p className="articleTopic">Topic: {article.topic}</p>
            <p className="articleDate">
              Date created:{' '}
              {moment(article.created_at).format('MMMM Do YYYY, h:mm:ssa')}
            </p>
            <p className="articleVotes">Votes: {article.votes}</p>
            <p className="articleComments" id={article}>
              Comments: {article.comment_count}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleFilter;
