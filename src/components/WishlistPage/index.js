import {React, Component} from "component";
import {inject} from "mobx-react";
import BookListPage from "components/BookListPage";
import style from "./style.css";

@inject("wishlist")
export default class WishlistPage extends Component {
  render() {
    const {wishlist} = this.props;

    return (
      <BookListPage bookList={wishlist}/>
    );
  }
}
