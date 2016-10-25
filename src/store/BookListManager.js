import _ from "lodash";
import {observable, computed, action, asMap, toJS, runInAction} from "mobx";
import storage from "storage";
import BookList from "./BookList";

const defaultBookLists = ["My Books", "Read", "Wishlist"];

export default class BookListManager {
  @observable loaded = false;
  @observable bookListMap = asMap({});
  @observable selectedBookList = null;

  constructor(id) {
    this.id = id;
    this.namespace = `BookListManager#${this.id}`;
    this.load();
  }

  @computed get bookLists() {
    return this.bookListMap.values();
  }

  @action createBookList(name, ...books) {
    books = books.filter((book) => !!book);
    if(this.hasBookList(name)) {
      this.addBooksToList(name, ...books);
    } else {
      this.bookListMap.set(name, new BookList(name, books));
      this.save();
    }
  }

  @action removeBookList(name) {
    this.bookListMap.delete(name);
    if(name === this.selectedBookList.name) {
      this.selectedBookList = this.bookLists[0] || null;
    }
    this.save();
  }

  @action addBooksToList(name, ...books) {
    const bookList = this.bookListMap.get(name);
    if(bookList) {
      bookList.push(...books);
    }
  }

  @action selectBookList(name) {
    this.selectedBookList = this.getBookList(name);
  }

  @action load() {
    storage.getItem(this.namespace)
      .then((bookListIds) => runInAction(() => {
        bookListIds = bookListIds || defaultBookLists;
        this.bookListMap = this.deserialize(bookListIds);
        this.selectedBookList = this.bookLists[0] || null;
        this.loaded = true;
      }))
      .catch(log);
  }

  deserialize(bookLists) {
    return asMap(bookLists.reduce((bookListMap, bookListId) => {
      bookListMap[bookListId] = new BookList(bookListId);
      return bookListMap;
    }, {}));
  }

  getBookList(id) {
    return this.bookListMap.get(id);
  }

  getBookListsWithBook(book) {
    return this.bookListMap.values().filter((bookList) => bookList.hasBook(book));
  }

  save() {
    storage.setItem(this.namespace, toJS(this.bookListMap.keys()))
      .catch(log);
  }

  hasBookList(id) {
    return this.bookListMap.has(id);
  }
}
