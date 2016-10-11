import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import style from "./style.css";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import {List} from "material-ui/List";
import BookList from "components/book-list";
import books from "books";
import store from "store";
import BookFilterBar from "components/book-filter-bar";
import RaisedButton from "material-ui/RaisedButton";

@observer
export default class SearchPage extends Component {
  state = {searchText: "", books: []};

  handleUpdateSearch = (e) => this.setState({searchText: e.target.value});

  fetchSearchResults = (event) => {
    if(event) event.preventDefault();
    const {searchText} = this.state;
    const {searchResults} = store;

    books.search(searchText)
      .then((result) => {
        store.updateSearchResult({query: searchText, result});
      })
      .catch(log);
  };

  render() {
    const {searchResult} = store;
    const {searchText} = this.state;
    const books = searchResult ? searchResult.result.items : [];

    return (
      <div className={style.root}>
        <BookFilterBar
          name="searchInputField"
          value={searchText}
          onChange={this.handleUpdateSearch}
          onSubmit={this.fetchSearchResults}
        />
        <BookList books={books}>
          <RaisedButton primary fullWidth>More</RaisedButton>
        </BookList>
      </div>
    );
  }
}
