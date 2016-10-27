import {React, Component} from "component";
import {inject} from "mobx-react";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui/svg-icons/content/clear";
import {List, ListItem} from "material-ui/List";
import style from "./style.css";

@inject("bookShelves")
export default class BookListDrawer extends Component {
  handleRemoveBookList = (event, bookList) => {
    event.stopPropagation();
    const {bookShelves} = this.props;
    bookShelves.removeBookList(bookList.id);
  }

  render() {
    const {open, onClose, onSelectList, bookShelves} = this.props;
    const {bookLists} = bookShelves;

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
