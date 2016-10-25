import {React, Component} from "component";
import {inject} from "mobx-react";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui/svg-icons/content/clear";
import {List, ListItem} from "material-ui/List";
import style from "./style.css";

@inject("bookListManager")
export default class BookListDrawer extends Component {
  handleRemoveBookList = (event, bookList) => {
    event.stopPropagation();
    const {bookListManager} = this.props;
    bookListManager.removeBookList(bookList.id);
  }

  render() {
    const {open, onClose, onSelectList, bookListManager} = this.props;
    const {bookLists} = bookListManager;

    return (
      <Drawer
        docked={false}
        width={window.innerWidth * 0.6}
        open={open}
        onRequestChange={onClose}
      >
        <List>
          {bookLists.map((bookList) =>
            <ListItem
              key={bookList.id}
              primaryText={bookList.id}
              secondaryText={`${bookList.books.length} book${bookList.books.length !== 1 ? "s" : ""}`}
              onTouchTap={() => onSelectList(bookList)}
              rightIcon={
                <ClearIcon
                  color="#A00"
                  onTouchTap={(event) => this.handleRemoveBookList(event, bookList)}
                />
              }
            />
          )}
        </List>
      </Drawer>
    );
  }
}
