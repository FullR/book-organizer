import {React, Component} from "component";
import BookList from "components/BookList";
import style from "./style.css";

export default class BookListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1
    };
  }

  handleExtend = () => this.setState({pageCount: this.state.pageCount + 1});

  render() {
    const {header, bookList, pageLength=20, children} = this.props;
    const {pageCount} = this.state;
    const {books, loading} = bookList;
    const bookDisplayCount = pageLength * pageCount;
    const displayBooks = books.length > bookDisplayCount ? books.slice(0, bookDisplayCount) : books;
    const canExtend = displayBooks.length < books.length;

    return (
      <div className={style.root}>
        <BookList
          header={header}
          books={displayBooks}
          onExtend={this.handleExtend}
          canExtend={canExtend}
          loading={loading}
          filterable
        />
      </div>
    );
  }
}
