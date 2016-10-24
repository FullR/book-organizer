import BookList from "./BookList";
import Interface from "./Interface";
import BookListManager from "./BookListManager";

export const library = new BookList("library");
export const wishlist = new BookList("wishlist");
export const bookListManager = new BookListManager("0");
export const ui = new Interface();

library.oppositeList = wishlist;
wishlist.oppositeList = library;
