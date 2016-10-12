import {last} from "lodash";
import {observable, computed, action, transaction, runInAction} from "mobx";
import Interface from "./Interface";
import BookQuery from "./BookQuery";

class BookLists {
  @observable library = [];
  @observable wishlist = [];
}

export default class Store {
  @observable ui = new Interface();
  @observable bookLists = new BookLists();
  @observable bookQuery = null;

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
    if(!hasBook) {
      log(`Adding ${book.id} to ${bookListId}`);
      bookList.push(book);
    }
  }

  @action removeFromBookList(bookListId, book) {
    const bookList = this.getBookList(bookListId);
    log(`Removing ${book.id} from ${bookListId}`);
    this.bookLists[bookListId] = bookList.filter(({id}) => id !== book.id);
  }

  getBookList(id) {
    return this.bookLists[id];
  }
}
