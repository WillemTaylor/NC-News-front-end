import React from 'react';
import { Link } from '@reach/router';

const ArticleFilter = ({articles, filter}) => {
   const filteredArr = articles.filter(article => article.topic.toLowerCase().includes(filter))
   return (
      <div>
         {filteredArr.map(article => {
            return (
               <div key= {article.article_id}>
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
            )
         })}
      </div>
   )
}

export default ArticleFilter