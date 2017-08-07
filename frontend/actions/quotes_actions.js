import * as APIUtil from '../util/quotes_api_util';

export const RECEIVE_QUOTES = 'RECEIVE_QUOTES';
export const RECEIVE_QUOTE = 'RECEIVE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

export const receiveQuotes = (quotes) => {
  return {
    type: RECEIVE_QUOTES,
    quotes
  };
};

export const receiveQuote = (quote) => {
  return {
    type: RECEIVE_QUOTE,
    quote
  };
};

export const removeQuote = (quote) => {
  return {
    type: DELETE_QUOTE,
    quote
  };
};

export const fetchAllQuotes = () => dispatch => {
  return APIUtil.fetchAllQuotes().then(
    resp => {
      if (resp.ok) {
        return resp.json();
      }
    }).then(
      resp =>  {
        dispatch(receiveQuotes(resp));
      }
    );
};

export const editQuote = (quote) => dispatch => {
  return APIUtil.editQuote(quote).then(
    resp => {
      if(resp.ok) {
        return resp.json();
      }
    }
  ).then(
    resp => {
      console.log(resp);
      dispatch(receiveQuote(resp));
    }
  );
};

export const createQuote = (quote) => dispatch => {
  return APIUtil.createQuote(quote).then(
    resp => {
      // console.log(resp);
      if (resp.ok) {
        return resp.json();
      }
    }).then(
      resp =>  {
        dispatch(receiveQuote(resp[0]));
      }
    );
};

export const deleteQuote = (name) => dispatch => {
  return APIUtil.deleteQuote(name).then(
    resp => {
      if (resp.ok) {
        return resp.json();
      }
    }).then(
      resp => {
        dispatch(removeQuote(resp));
      }
    );
};
