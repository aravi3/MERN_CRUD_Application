import React from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Quotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      quote: "",
      code: ""
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setName = this.setName.bind(this);
    this.setQuote = this.setQuote.bind(this);
    this.setCode = this.setCode.bind(this);
  }

  setName(e) {
    e.preventDefault();
    let name = e.target.value ? e.target.value : "";
    this.setState({ name });
  }

  setQuote(e) {
    e.preventDefault();
    let quote = e.target.value ? e.target.value : "";
    this.setState({ quote });
  }

  setCode(newVal) {
    let code = newVal;
    this.setState({ code });
  }

  handleCreate(e) {
    e.preventDefault();

    let obj = {
      name: this.state.name,
      quote: this.state.quote
    };

    this.props.createQuote(obj);

    this.setState({ name: "" });
    this.setState({ quote: "" });
  }

  handleUpdate(e) {
    e.preventDefault();

    let obj = {
      name: this.state.name,
      quote: this.state.quote
    };

    this.props.editQuote(obj);

    this.setState({ name: "" });
    this.setState({ quote: "" });
  }

  handleDelete(e) {
    e.preventDefault();
    let obj = {
      name: this.state.name
    };
    this.props.deleteQuote(obj.name);

    this.setState({ name: "" });
    this.setState({ quote: "" });
  }

  componentWillMount() {
    this.props.fetchAllQuotes();
  }

  render() {

    let quotes = this.props.quotes.map((quote, idx) => {
      return (<li key={`quote-${idx}`}>{quote.name}: {quote.quote}</li>);
    });

    return (
      <div>
        <ul className="quotes">
          {quotes}
        </ul>

        <form>
          <input onChange={this.setName} type="text" placeholder="name" name="name" value={this.state.name} />
          <input onChange={this.setQuote} type="text" placeholder="quote" name="quote" value={this.state.quote} />
          <br />
          <button onClick={this.handleCreate}>Create</button>
          <button onClick={this.handleUpdate}>Update</button>
          <button onClick={this.handleDelete}>Delete</button>
        </form>

        <br /><br />
          <AceEditor
            mode="javascript"
            theme="monokai"
            highlightActiveLine={true}
            onChange={this.setCode}
            name="UNIQUE_ID_OF_DIV"
            value={this.state.code}
            editorProps={{$blockScrolling: true}}
          />
      </div>
    );
  }
}

export default Quotes;
