import { combineReducers } from 'redux';

import quotesReducer from './quotes_reducer';

const RootReducer = combineReducers({
  quotes: quotesReducer
});

export default RootReducer;
