import BookList from "./BookList";
import Interface from "./Interface";
import BookListManager from "./BookListManager";

export const library = new BookList("bookShelves");
export const wishlist = new BookList("wishlist");
export const bookShelves = new BookListManager("bookShelves");
export const ui = new Interface();

library.oppositeList = wishlist;
wishlist.oppositeList = library;
