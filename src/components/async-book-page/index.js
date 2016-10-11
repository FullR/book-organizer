import React, {PropTypes, Component} from "react";
import style from "./style.css";
import BookList from "components/book-list";
import books from "books";
import store from "store";

export default class AsyncBookPage extends Component {
  state = {loaded: false, books: []};

  lookupBooks(bookIds) {
    Promise.all(bookIds.map(books.lookup))
      .then((books) => this.setState({loaded: true, books}));
  }

  componentDidMount() {
    this.lookupBooks(this.props.bookIds);
  }

  componentWillReceiveProps({bookIds}) {
    if(bookIds !== this.props.bookIds) {
      this.lookupBooks(bookIds);
    }
  }

  render() {
    const {bookListSubheader} = this.props;
    const {loaded, books} = this.state;

    return (
      <div className={style.root}>
        <BookList books={books} subheader={bookListSubheader}/>
      </div>
    );
  }
}
