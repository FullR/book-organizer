import {React, Component} from "component";
import {inject} from "mobx-react";
import ListIcon from "material-ui/svg-icons/action/list";
import IconButton from 'material-ui/IconButton';
import BookListPage from "components/BookListPage";
import BookList from "components/BookList";
import Screen from "components/Screen";
import AppBar from "components/AppBar";
import ScrollContainer from "components/ScrollContainer";
import BookListDrawer from "components/BookListDrawer";
import style from "./style.css";

@inject("bookListManager")
export default class LibraryPage extends Component {
  state = {
    bookListDrawerOpen: false
  };

  handleChangeBookList = (bookList) => {
    this.setState({bookListDrawerOpen: false});
    this.props.bookListManager.selectBookList(bookList.id);
  };
  handleBookListDrawerOpen = () => this.setState({bookListDrawerOpen: true});
  handleBookListDrawerclose = () => this.setState({bookListDrawerOpen: false});

  render() {
    const {bookListManager} = this.props;
    const {bookListDrawerOpen} = this.state;
    const {selectedBookList: bookList} = bookListManager;
    const books = bookList ? bookList.books : [];
    log(`rendering ${bookList.id}`);

    return (
      <Screen>
        <AppBar
          title={bookList ? bookList.id : ""}
          iconElementLeft={<IconButton onClick={this.handleBookListDrawerOpen}><ListIcon/></IconButton>}
          onLeftIconButtonTouchTap={this.handleBookListDrawerOpen}
        />
        <ScrollContainer>
          {bookList &&
            <BookListPage bookList={bookList}/>
          }
        </ScrollContainer>

        <BookListDrawer
          open={bookListDrawerOpen}
          onClose={this.handleBookListDrawerclose}
          onSelectList={this.handleChangeBookList}
        />
      </Screen>
    );
  }
}
