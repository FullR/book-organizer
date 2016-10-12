import style from "./style.css";
import TextField from "material-ui/TextField";
import BookList from "components/BookList";

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

    return (
      <div className={style.root}>
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
        <BookList
          books={bookQuery ? bookQuery.books : []}
          onExtend={this.handleExtendSearchResults}
        />
      </div>
    );
  }
}
