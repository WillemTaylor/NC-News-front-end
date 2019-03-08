import React from 'react';

export const Err400 = props => {
  return (
    <h1 className="error">
      {props.location.state.data['Error 400']}Invalid input, topic doesn't exist
    </h1>
  );
};

export const Err404 = props => {
  return (
    <h1 className="error">
      {props.location.state.data['Error 404']}Error, not found
    </h1>
  );
};

export const Err422 = props => {
  return (
    <h1 v>{props.location.state.data['Error 422']}Error, already exists</h1>
  );
};

export const NoMatch = () => {
  return <h2 className="error">Error: URL not found</h2>;
};
