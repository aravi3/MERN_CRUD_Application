import React from 'react';
import { Route } from 'react-router-dom';
import QuotesContainer from './quotes/quotes_container';

const App = () => {
  return (
    <div>
      <Route path='/' component={QuotesContainer} />
    </div>
  );
};

export default App;
