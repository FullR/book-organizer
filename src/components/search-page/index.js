import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import style from "./style.css";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import {List} from "material-ui/List";
import BookList from "components/book-list";
import books from "books";
import store from "store";

@observer
export default class SearchPage extends Component {
  state = {searchText: "", books: []};

  handleUpdateSearch = (e) => this.setState({searchText: e.target.value});

  fetchSearchResults = (event) => {
    if(event) event.preventDefault();
    const {searchText} = this.state;

    books.search(searchText)
      .then(({items}) => {
        store.updateSearchResults(items);
      })
      .catch(log);
  };

  render() {
    const {searchResults} = store;
    const {searchText} = this.state;

    return (
      <div className={style.root}>
        <form className={style.searchForm} onSubmit={this.fetchSearchResults}>
          <TextField name="searchField" hintText="Search" value={searchText} onChange={this.handleUpdateSearch} fullWidth/>
        </form>
        <BookList books={searchResults}/>
      </div>
    );
  }
}
