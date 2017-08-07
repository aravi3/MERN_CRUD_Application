import merge from 'lodash/merge';
import {
  RECEIVE_QUOTES,
  RECEIVE_QUOTE,
  DELETE_QUOTE
} from '../actions/quotes_actions';

const initialState = {};

const quotesReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;

  switch(action.type) {
    case RECEIVE_QUOTES:
      newState = {};

      console.log(action.quotes);

      action.quotes.forEach(quote => {
        newState[quote._id] = {
          id: quote._id,
          name: quote.name,
          quote: quote.quote
        };
      });

      return newState;
    case RECEIVE_QUOTE:
      newState = merge({}, state);

      newState[action.quote._id] = {
        id: action.quote._id,
        name: action.quote.name,
        quote: action.quote.quote
      };

      return newState;
    case DELETE_QUOTE:
      console.log(action.quote);
      newState = merge({}, state);
      delete newState[action.quote._id];
      return newState;
    default:
      return state;
  }
};

export default quotesReducer;
