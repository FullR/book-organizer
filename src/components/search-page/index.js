import React, {PropTypes, Component} from "react";
import style from "./style.css";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import {List} from "material-ui/List";
import BookList from "components/book-list";
import books from "books";
import store from "store";

export default class SearchPage extends Component {
  state = {searchText: "", books: []};

  handleUpdateSearch = (e) => this.setState({searchText: e.target.value});
  handleTouchTapBook = (book) => store.addToLibrary(book.id);
  handleHoldTapBook = (book) => store.removeFromLibrary(book.id);

  fetchSearchResults = (event) => {
    if(event) event.preventDefault();
    const {searchText} = this.state;

    books.search(searchText)
      .then(({items}) => {
        this.setState({books: items});
      })
      .catch(log);
  };

  render() {
    const {searchText, books} = this.state;

    return (
      <div className={style.root}>
        <form className={style.searchForm} onSubmit={this.fetchSearchResults}>
          <TextField name="searchField" value={searchText} onChange={this.handleUpdateSearch} fullWidth/>
        </form>
        <BookList
          books={books}
          onTouchTapItem={this.handleTouchTapBook}
          onHoldTapItem={this.handleBookCtx}
        />
      </div>
    );
  }
}
