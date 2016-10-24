import {observable, action, runInAction, toJS, asFlat} from "mobx";
import storage from "storage";

export default class BookList {
  oppositeList = null;
  @observable books = asFlat([]);
  @observable loading = true;

  constructor(id) {
    this.id = id;
    this.storageId = `bookList#${id}`;
    this.load();
  }

  @action addBook(book) {
    if(book && !this.hasBook(book)) {
      this.books.push(book);
      this.save();

      if(this.oppositeList) {
        this.oppositeList.removeBook(book);
      }
    }
  }

  @action removeBook(book) {
    if(book && this.hasBook(book)) {
      this.books = this.books.filter(({id}) => id !== book.id);
      this.save();
    }
  }

  @action toggleBook(book) {
    if(this.hasBook(book)) {
      this.removeBook(book);
    } else {
      this.addBook(book);
    }
  }

  @action load() {
    this.loading = true;
    storage.getItem(this.storageId)
      .then((books) => {
        if(books && books.length) {
          runInAction(() => {
            this.books = books;
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      })
      .catch(log);
  }

  save() {
    const books = toJS(this.books);
    storage.setItem(this.storageId, books)
      .catch(log);
  }

  hasBook(book) {
    return book && !!this.books.find(({id}) => book.id === id);
  }
}
