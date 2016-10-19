import {React, Component} from "component";
import {List} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";
import BookListItem from "components/BookListItem";
import style from "./style.css";

function filterBooks(books, filterText) {
  filterText = filterText.trim();
  if(!filterText.length) return books;
  const filterRegexp = new RegExp(filterText, "i");
  const test = filterRegexp.test.bind(filterRegexp);

  return books.filter((book) => {
    const {title, authors, description} = book.volumeInfo;

    return (
      title && test(title) ||
      authors && authors.some(test) ||
      description && test(description)
    );
  });
}

export default class BookList extends Component {
  state = {filterText: ""};

  handleUpdateFilterText = (event) => this.setState({filterText: event.target.value});

  render() {
    const {books, filterable, header, onExtend, canExtend=true, loading, loadingMore, children} = this.props;
    const {filterText} = this.state;
    const filteredBooks = filterBooks(books, filterText);

    return (
      <div className={style.root}>
        {header &&
          <Subheader>{header}</Subheader>
        }
        {filterable &&
          <div className={style.filterInputContainer}>
            <TextField onChange={this.handleUpdateFilterText} value={filterText} hintText="Filter" fullWidth/>
          </div>
        }
        {(loading && !loadingMore) ?
          <div className={style.loadingContainer}>
            <CircularProgress/>
          </div> :
          <List>
            {filteredBooks.map((book, i) =>
              <BookListItem key={i} book={book}/>
            )}
            {canExtend && books.length ?
              <RaisedButton primary fullWidth
                icon={loadingMore ? <CircularProgress size={30}/> : null}
                label={loadingMore ? null : "More"}
                onTouchTap={loadingMore ? null : onExtend}
                disabled={loadingMore}
              /> :
              null
            }
          </List>
        }
      </div>
    );
  }
}
