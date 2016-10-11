import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import style from "./style.css";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import AddBoxIcon from "material-ui/svg-icons/content/add-box";
import AddIcon from "material-ui/svg-icons/content/add";
import ClearIcon from "material-ui/svg-icons/content/clear";
import {List, ListItem} from "material-ui/List";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Subheader from "material-ui/Subheader";
import ExpandableText from "components/expandable-text";
import store from "store";

const noop = () => {};

const iconButtonElement = (
  <IconButton tooltip="Add" touch>
    <AddBoxIcon/>
  </IconButton>
);

function toggleAddIcon(enabled) {
  return enabled ? <ClearIcon/> : <AddIcon/>;
}

@observer
class BookListItem extends Component {
  state = {expanded: false};

  handleToggleExpanded = () => this.setState({expanded: !this.state.expanded});

  render() {
    const {book} = this.props;
    const {expanded} = this.state;

    return (
      <ListItem
        key={book.id}
        onTouchTap={this.handleToggleExpanded}
        primaryText={<ExpandableText clamp={1} expanded={expanded}>{book.volumeInfo.title}</ExpandableText>}
        leftAvatar={<Avatar src={`https://books.google.com/books/content/images/frontcover/${book.id}`}/>}
        rightIconButton={
          <IconMenu iconButtonElement={iconButtonElement} className={style.listItemIcon}>
            {store.bookListNames.map((bookListName) => {
              const isInList = store.isInBookList(bookListName, book.id);
              return (
                <MenuItem
                  key={bookListName}
                  onClick={(isInList ? store.removeFromBookList : store.addToBookList).bind(store, bookListName, book.id)}
                  rightIcon={toggleAddIcon(isInList)}
                >
                  {bookListName}
                </MenuItem>
              );
            })}
          </IconMenu>
        }
        onContextMenu={(e) => {
          e.preventDefault();
          if(onHoldTap) {
            onHoldTap(book, e);
          }
        }}
      />
    );
  }
}

export default function BookList(props) {
  const {books, subheader, children} = props;

  return (
    <List className={style.root}>
      {subheader ?
        <Subheader>{subheader}</Subheader> :
        null
      }
      {books.map((book) =>
        <BookListItem key={book.id} book={book}/>
      )}
    </List>
  );
}
