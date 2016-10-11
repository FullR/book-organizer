import {observable, computed, action} from "mobx";

export default class Store {
  bookListNames = ["library", "wishlist"];

  @observable bookLists = {
    library: [],
    wishlist: []
  };

  @observable searchResults = [];

  @action updateSearchResults(books) {
    this.searchResults = log(books, "updateSearchResults");
  }

  @action addToBookList(listname, bookId) {
    if(!this.isInBookList(listname, bookId)) {
      log(`adding ${bookId} to ${listname}`);
      this.bookLists[listname] = [bookId, ...this.bookLists[listname]];
    }
  }

  @action removeFromBookList(listname, bookId) {
    log(`removing ${bookId} from ${listname}`);
    this.getBookList(listname).remove(bookId);
  }

  isInBookList(listname, bookId) {
    return this.getBookList(listname).includes(bookId);
  }

  getBookList(listname) {
    return this.bookLists[listname];
  }
}
