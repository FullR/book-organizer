import {observable, computed, action} from "mobx";

export default class Store {
  @observable library = [];

  @action addToLibrary(bookId) {
    if(this.library.indexOf(bookId) === -1) {
      this.library = [bookId, ...this.library];
    }
  }

  @action removeFromLibrary(bookId) {
    if(this.library.indexOf(bookId) !== -1) {
      this.library = this.library.filter((book) => book.id !== bookId);
    }
  }
}
