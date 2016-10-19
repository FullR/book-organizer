import {React, Component} from "component";
import {inject} from "mobx-react";
import TextField from "material-ui/TextField";
import BookList from "components/BookList";
import {StickyContainer, Sticky} from "react-sticky";
import style from "./style.css";

@inject("ui")
export default class BookSearchPage extends Component {
  state = {searchText: ""};
  constructor(props) {
    super(props);
    const {bookQuery} = props.ui;
    this.state = {
      searchText: bookQuery ? bookQuery.query : ""
    };
  }

  handleSearchFormSubmit = (event) => {
    event.preventDefault();
    this.props.ui.search(this.state.searchText);
  };

  handleSearchInputChange = (event) => {
    this.setState({searchText: event.target.value});
  };

  render() {
    const {ui} = this.props;
    const {searchText} = this.state;
    const {bookQuery} = ui;

    return (
      <div className={style.root}>
        <form className={style.searchForm} onSubmit={this.handleSearchFormSubmit}>
          <TextField
            ref="searchInput"
            value={searchText}
            onChange={this.handleSearchInputChange}
            hintText="Search"
            name="BookSearchPage__searchInput"
            fullWidth
          />
        </form>
        <BookList
          books={bookQuery ? bookQuery.books : []}
          onExtend={ui.extendSearch}
          loading={bookQuery && bookQuery.loading}
          loadingMore={bookQuery && bookQuery.loadingMore}
        />
      </div>
    );
  }
}
