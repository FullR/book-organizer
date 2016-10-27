import {React, Component} from "component";
import {inject} from "mobx-react";
import Drawer from "material-ui/Drawer";
import FloatingActionButton from "material-ui/FloatingActionButton";
import AddIcon from "material-ui/svg-icons/content/add";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import BookDetails from "components/BookDetails";
import BookListPopover from "components/BookListPopover";
import ScrollContainer from "components/ScrollContainer";
import style from "./style.css";

@inject("ui", "bookShelves")
export default class BookDetailsDrawer extends Component {
  state = {bookListMenuOpen: false, bookListMenuEl: null};

  handleClose = () => this.props.ui.closeBookDialog();
  handleToggleInBookList = (bookList) => {
    const {bookDialogBook} = this.props.ui;
    bookList.toggleBook(bookDialogBook);
    this.handleCloseBookListMenu();
  };
  handleCloseBookListMenu = () => this.setState({bookListMenuOpen: false, bookListMenuEl: null});
  handleOpenBookListMenu = (event) => {
    event.preventDefault();
    this.setState({
      bookListMenuOpen: true,
      bookListMenuEl: event.currentTarget
    });
  };

  render() {
    const {bookListMenuOpen, bookListMenuEl} = this.state;
    const {ui} = this.props;
    const {bookDialogOpen, bookDialogBook} = ui;
    const title = bookDialogBook ? bookDialogBook.volumeInfo.title : "";

    return (
      <Drawer
        containerClassName={style.root}
        open={bookDialogOpen}
        onRequestChange={this.handleClose}
        width={window.innerWidth * 0.8}
        docked={false}
      >
        <ScrollContainer className={style.children}>
          <BookDetails book={bookDialogBook}/>
        </ScrollContainer>
        <div className={style.buttons}>
          <FloatingActionButton onTouchTap={this.handleOpenBookListMenu}>
            <AddIcon/>
          </FloatingActionButton>
        </div>

        <BookListPopover
          book={bookDialogBook}
          onSelectList={this.handleToggleInBookList}
          open={bookListMenuOpen}
          anchorEl={bookListMenuEl}
          anchorOrigin={{vertical: "bottom", horizontal: "middle"}}
          targetOrigin={{vertical: "top", horizontal: "middle"}}
          onRequestClose={this.handleCloseBookListMenu}
        />
      </Drawer>
    );
  }
}
