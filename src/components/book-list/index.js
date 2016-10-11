import React, {PropTypes} from "react";
import style from "./style.css";
import Avatar from "material-ui/Avatar";
import {List, ListItem} from "material-ui/List";
import AsyncBook from "components/async-book";

function BookListItem(props) {
  const {book, onTouchTap, onHoldTap} = props;
  return (
    <ListItem
      key={book.id}
      primaryText={book.volumeInfo.title}
      leftAvatar={<Avatar src={`https://books.google.com/books/content/images/frontcover/${book.id}`}/>}
      onTouchTap={(e) => {
        if(onTouchTap) onTouchTap(book, e);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if(onHoldTap) {
          onHoldTap(book, e);
        }
      }}
    />
  );
}

export default function BookList(props) {
  const {books, onTouchTapItem, onHoldTapItem, children} = props;

  return (
    <List className={style.root}>
      {books.map((book) =>
        <BookListItem
          key={book.id}
          book={book}
          onTouchTap={onTouchTapItem}
          onHoldTap={onHoldTapItem}
        />
      )}
    </List>
  );
}
