import React, {PropTypes, Component} from "react";
import style from "./style.css";
import BookList from "components/book-list";
import {Toolbar, ToolbarTitle} from "material-ui/Toolbar";
import books from "books";
import store from "store";
import BookFilterBar from "components/book-filter-bar";
import RaisedButton from "material-ui/RaisedButton";

function filterBooks(books, filterText) {
  filterText = filterText.trim();
  if(!filterText.length) return books;
  const regexp = new RegExp(filterText, "i");
  return books.filter((book) =>
    (book.volumeInfo.title && book.volumeInfo.title.match(regexp)) ||
    (book.volumeInfo.authors && book.volumeInfo.authors.some((author) => author.match(regexp)))
  );
}

export default class AsyncBookPage extends Component {
  state = {loading: true, books: [],  filterText: ""};
  loadIndex = 0;

  handleChangeFilterText = (e) => this.setState({filterText: e.target.value});
  handleLoadMoreBooks = () => {
    this.lookupBooks(this.props.bookIds);
  };

  lookupBooks(bookIds) {
    const {loadCount=3} = this.props;
    const {loadIndex} = this;
    if(loadIndex >= this.props.bookIds.length) return;

    this.loadIndex = loadIndex + loadCount;
    if(!this.state.loading) this.setState({loading: true});
    Promise.all(bookIds.slice(loadIndex, loadIndex + loadCount).map(books.lookup))
      .then((books) => this.setState({
        loading: false,
        books: [...this.state.books, ...books]
      }));
  }

  canLoadMore() {
    return !this.loading && this.state.books.length < this.props.bookIds.length;
  }

  componentDidMount() {
    this.lookupBooks(this.props.bookIds);
  }

  componentWillReceiveProps({bookIds}) {
    if(bookIds !== this.props.bookIds) {
      this.loadIndex = 0;
      this.lookupBooks(bookIds);
    }
  }

  render() {
    const {bookListSubheader} = this.props;
    const {books, filterText} = this.state;
    const filteredBooks = filterBooks(books, filterText);

    return (
      <div className={style.root}>
        <BookFilterBar value={filterText} onChange={this.handleChangeFilterText}/>
        <BookList books={filteredBooks}>
          {books.length ?
            <RaisedButton onClick={this.handleLoadMoreBooks} disabled={!this.canLoadMore()} primary fullWidth>More</RaisedButton> :
            null
          }
        </BookList>
      </div>
    );
  }
}
