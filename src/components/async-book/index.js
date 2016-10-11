import React, {PropTypes, Component} from "react";
import style from "./style.css";
import books from "books";

export default class AsyncBook extends Component {
  constructor(props) {
    super(props);
    const {book, bookId} = props;
    const loaded = book || books.isCached(bookId);
    this.state = {
      loaded,
      book: book || (loaded ? books.getCachedBook(bookId) : null)
    };
  }

  componentDidMount() {
    if(!this.state.loaded) {
      this.fetchBook(this.props.bookId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookId !== this.props.bookId) {
      this.fetchBook(nextProps.bookId);
    }
  }

  fetchBook(bookId) {
    books.lookup(bookId)
      .then((book) => this.setState({loaded: true, book: log(book)}))
      .catch(log);
  }

  render() {
    const {book} = this.state;
    if(!book) return null;
    return this.props.children(this.state.book);
  }
}
