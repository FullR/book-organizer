import {React, Component} from "component";
import TextField from "material-ui/TextField";
import BookList from "components/BookList";
import {StickyContainer, Sticky} from "react-sticky";
import style from "./style.css";

export default class BookSearchPage extends Component {
  state = {searchQuery: ""};

  handleSearchFormSubmit = (event) => {
    event.preventDefault();
    this.props.store.search(this.state.searchQuery);
  };

  handleSearchInputChange = (event) => {
    this.setState({searchQuery: event.target.value});
  };

  handleExtendSearchResults = () => this.props.store.extendSearch();

  render() {
    const {store} = this.props;
    const {searchQuery} = this.state;
    const {bookQuery} = store;
    log("Rendering BookSearchPage");

    return (
      <StickyContainer className={style.root}>
        <Sticky className={style.sticky}>
          <form className={style.searchForm} onSubmit={this.handleSearchFormSubmit}>
            <TextField
              ref="searchInput"
              value={searchQuery}
              onChange={this.handleSearchInputChange}
              hintText="Search"
              name="BookSearchPage__searchInput"
              fullWidth
            />
          </form>
        </Sticky>
        <BookList
          books={bookQuery ? bookQuery.books : []}
          onExtend={this.handleExtendSearchResults}
          loading={bookQuery && bookQuery.loading}
          loadingMore={bookQuery && bookQuery.loadingMore}
        />
      </StickyContainer>
    );
  }
}
