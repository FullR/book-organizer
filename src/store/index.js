import BookList from "./BookList";
import Interface from "./Interface";

export const library = new BookList("library");
export const wishlist = new BookList("wishlist");
export const ui = new Interface();

library.oppositeList = wishlist;
wishlist.oppositeList = library;
