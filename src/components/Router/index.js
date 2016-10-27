import {React, Component} from "component";
import {inject} from "mobx-react";
import BookSearchPage from "components/BookSearchPage";
import BookShelvesPage from "components/BookShelvesPage";
import style from "./style.css";

@inject("ui")
export default class Router extends Component {
  render() {
    const [head, ...params] = this.props.ui.route.split("/");

    switch(head) {
      case "bookShelves": return (<BookShelvesPage/>);
      case "wishlist": return (<WishlistPage/>);
      default: return (<BookSearchPage/>);
    }
  }
}
