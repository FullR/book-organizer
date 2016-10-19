import {React, Component} from "component";
import {inject} from "mobx-react";
import BookListPage from "components/BookListPage";
import style from "./style.css";

@inject("library")
export default class LibraryPage extends Component {
  render() {
    const {library} = this.props;

    return (
      <BookListPage bookList={library}/>
    );
  }
}
