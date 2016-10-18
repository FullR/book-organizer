import {last} from "lodash";
import {observable, computed, action, transaction, runInAction} from "mobx";
import Interface from "./Interface";
import BookQuery from "./BookQuery";
import storage from "storage";

class BookLists {
  @observable library = [];
  @observable wishlist = [];
}

export default class Store {
  @observable ui = new Interface();
  @observable bookLists = new BookLists();
  @observable bookQuery = null;

  constructor() {
    storage.getItem("state")
      .then((state) => {
        log(state);
        if(state) {
          const {bookLists={}} = state;
          this.bookLists.library = bookLists.library || [];
          this.bookLists.wishlist = bookLists.wishlist || [];
        }
      })
      .catch((error) => log(`Failed to load state:`, error));
  }

  @computed get serialized() {
    return {
      bookLists: this.bookLists
    };
  }

  @action search(query) {
    if(!query.trim().length) return;
    const bookQuery = new BookQuery(query);
    this.bookQuery = bookQuery;
    bookQuery.fetch();
  }

  @action extendSearch() {
    const {bookQuery} = this;
    if(bookQuery) {
      bookQuery.fetch();
    }
  }

  @action addToBookList(bookListId, book) {
    const bookList = this.getBookList(bookListId);
    const hasBook = !!bookList.find(({id}) => id === book.id);
    log(book);
    if(!hasBook) {
      log(`Adding ${book.id} to ${bookListId}`);
      bookList.push(book);
      this.save();
    }
  }

  @action removeFromBookList(bookListId, book) {
    const bookList = this.getBookList(bookListId);
    log(`Removing ${book.id} from ${bookListId}`);
    this.bookLists[bookListId] = bookList.filter(({id}) => id !== book.id);
    this.save();
  }

  save() {
    const {serialized} = this;
    log("Saving", serialized);
    storage.setItem("state", serialized)
      .then(() => log("Saved"))
      .catch(log);
  }

  getBookList(id) {
    return this.bookLists[id];
  }

  isInBookList(bookListName, book) {
    const {id} = book;
    return !!this.bookLists[bookListName].find((otherBook) => otherBook.id === id);
  }
}
