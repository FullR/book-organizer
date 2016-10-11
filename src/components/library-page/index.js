import React, {PropTypes, Component} from "react";
import style from "./style.css";
import {observer} from "mobx-react";
import BookList from "components/book-list";
import books from "books";
import store from "store";

@observer
export default class LibraryPage extends Component {
  state = {loaded: false, books: []};

  componentDidMount() {
    Promise.all(store.library.map(books.lookup))
      .then((books) => this.setState({loaded: true, books}));
  }

  render() {
    const {children} = this.props;
    const {loaded, books} = this.state;

    return (
      <div className={style.root}>
        <BookList books={books}/>
      </div>
    );
  }
}
