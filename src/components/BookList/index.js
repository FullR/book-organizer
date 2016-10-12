import style from "./style.css";
import {List} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import BookListItem from "components/BookListItem";

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
    const {books, filterable, header, onExtend, canExtend=true, children} = this.props;
    const {filterText} = this.state;
    const filteredBooks = filterBooks(books, filterText);

    return (
      <div>
        {header ?
          <Subheader>{header}</Subheader> :
          null
        }
        {filterable ?
          <div className={style.filterInputContainer}>
            <TextField onChange={this.handleUpdateFilterText} value={filterText} hintText="Filter" fullWidth/>
          </div> :
          null
        }
        <List className={style.root}>
          {filteredBooks.map((book, i) =>
            <BookListItem key={i} book={book}/>
          )}
          {canExtend && books.length ?
            <RaisedButton onTouchTap={onExtend} primary fullWidth>More</RaisedButton> :
            null
          }
        </List>
      </div>
    );
  }
}
