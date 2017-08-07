export const fetchAllQuotes = () => {
  return fetch('/quotes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const createQuote = (quote) => {
  return fetch('/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: quote.name,
      quote: quote.quote
    })
  });
};

export const editQuote = (quote) => {
  return fetch('/quotes', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: quote.name,
      quote: quote.quote
    })
  });
};

export const deleteQuote = (name) => {
  return fetch('/quotes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};
