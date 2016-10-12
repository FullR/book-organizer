import style from "./style.css";
import BookList from "components/BookList";

export default class BookListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1
    };
  }

  handleExtend = () => this.setState({pageCount: this.state.pageCount + 1});

  render() {
    const {header, books, pageLength=20, children} = this.props;
    const {pageCount} = this.state;
    const bookDisplayCount = pageLength * pageCount;
    const displayBooks = books.length > bookDisplayCount ? books.slice(0, bookDisplayCount) : books;
    const canExtend = displayBooks.length < books.length;

    return (
      <div className={style.root}>
        <BookList header={header} books={displayBooks} onExtend={this.handleExtend} canExtend={canExtend} filterable/>
      </div>
    );
  }
}
