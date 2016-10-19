import {React, Component} from "component";
import {inject} from "mobx-react";
import BookSearchPage from "components/BookSearchPage";
import LibraryPage from "components/LibraryPage";
import WishlistPage from "components/WishlistPage";
import style from "./style.css";

@inject("ui")
export default class Router extends Component {
  render() {
    const [head, ...params] = this.props.ui.route.split("/");

    switch(head) {
      case "library": return (<LibraryPage/>);
      case "wishlist": return (<WishlistPage/>);
      default: return (<BookSearchPage/>);
    }
  }
}
