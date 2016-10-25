import {React, Component} from "component";
import {inject} from "mobx-react";
import AddIcon from "material-ui/svg-icons/content/add";
import RemoveIcon from "material-ui/svg-icons/content/clear";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import style from "./style.css";

const addIcon = (<AddIcon color="#00A"/>);
const removeIcon = (<RemoveIcon color="#A00"/>);

@inject("bookListManager")
export default class BookListPopover extends Component {
  state = {newListName: "", newListErrorText: null};

  handleChangeNewListName = (event) => {
    event.preventDefault();
    this.setState({newListName: event.target.value});
  };

  handleCreateNewList = (event) => {
    event.preventDefault();
    const {bookListManager, book, onRequestClose} = this.props;
    const newListName = this.state.newListName.trim();
    if(bookListManager.hasBookList(newListName)) {
      this.setState({newListErrorText: "A list with that name already exists"});
    } else {
      log(`Creating book list ${newListName}`);
      bookListManager.createBookList(newListName, book);
      this.setState({newListName: ""});
      if(onRequestClose) {
        onRequestClose();
      }
    }
  };

  render() {
    const {bookListManager, onSelectList, book, ...rest} = this.props;
    const {newListName, newListErrorText} = this.state;
    const {bookLists} = bookListManager;
    const menuItems = bookLists.map((bookList) => {
      const isBookInList = book && bookList.hasBook(book);
      const icon = book ? (isBookInList ? removeIcon : addIcon) : null;
      return (
        <MenuItem
          key={bookList.id}
          primaryText={bookList.id}
          onTouchTap={() => onSelectList(bookList)}
          leftIcon={icon}
        />
      );
    });

    return (
      <Popover {...rest}>
        <Menu disableAutoFocus>
          {menuItems}
          <Divider/>
          <MenuItem>
            <div className={style.addListForm}>
              <form onSubmit={this.handleCreateNewList}>
                <TextField
                  name="newListInput"
                  fullWidth
                  value={newListName}
                  onChange={this.handleChangeNewListName}
                  hintText="Create"
                />
              </form>
            </div>
          </MenuItem>
        </Menu>
      </Popover>
    );
  }
}
