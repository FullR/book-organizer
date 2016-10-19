import {React, Component} from "component";
import {inject} from "mobx-react";
import BookSearchPage from "components/BookSearchPage";
import BookListPage from "components/BookListPage";
import style from "./style.css";

@inject("store")
export default class Router extends Component {
  render() {
    const {store} = this.props;
    const [head, ...params] = store.ui.route.split("/");

    switch(head) {
      case "library": return (
        <BookListPage
          key="library"
          store={store}
          books={store.bookLists.library}
        />
      );
      case "wishlist": return (
        <BookListPage
          key="wishlist"
          store={store}
          books={store.bookLists.wishlist}
        />
      );
      default: return (
        <BookSearchPage
          key="search"
          store={store}
        />
      );
    }
  }
}
