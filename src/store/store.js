import {observable, computed, action, transaction} from "mobx";

export default class Store {
  bookListNames = ["library", "wishlist"];

  @observable bookLists = {
    library: [],
    wishlist: []
  };

  @observable searchResult = null;

  @action updateSearchResult(result) {
    log("Updating search result", result.result.items.map((i) => i.id).join(", "));
    this.searchResult = result;
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
