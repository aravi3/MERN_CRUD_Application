import { connect } from 'react-redux';
import Quotes from './quotes';
import {
  fetchAllQuotes,
  createQuote,
  deleteQuote,
  editQuote
} from '../../actions/quotes_actions';

const mapStateToProps = (state) => {
  return {
    quotes: Object.values(state.quotes)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllQuotes: () => dispatch(fetchAllQuotes()),
    editQuote: (quote) => dispatch(editQuote(quote)),
    createQuote: (quote) => dispatch(createQuote(quote)),
    deleteQuote: (name) => dispatch(deleteQuote(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotes);
