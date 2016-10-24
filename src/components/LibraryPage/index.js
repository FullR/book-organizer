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
  state = {bookList: null, bookListDrawerOpen: false};

  handleBookListDrawerOpen = () => this.setState({bookListDrawerOpen: true});
  handleBookListDrawerclose = () => this.setState({bookListDrawerOpen: false});

  render() {
    const {bookListManager} = this.props;
    const {bookList, bookListDrawerOpen} = this.state;
    const books = (bookList && bookList.books) || bookListManager.books;

    return (
      <Screen>
        <AppBar
          title={bookList ? bookList.name : "All"}
          iconElementLeft={<IconButton onClick={this.handleBookListDrawerOpen}><ListIcon/></IconButton>}
          onLeftIconButtonTouchTap={this.handleBookListDrawerOpen}
        />
        <ScrollContainer>
          <BookList books={books} filterable/>
        </ScrollContainer>

        <BookListDrawer
          open={bookListDrawerOpen}
          onClose={this.handleBookListDrawerclose}
        />
      </Screen>
    );
  }
}
