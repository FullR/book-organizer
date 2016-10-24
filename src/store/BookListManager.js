import _ from "lodash";
import {observable, computed, action, asMap, toJS} from "mobx";
import storage from "storage";
import BookList from "./BookList";

function createDefaultBookLists() {
  return {
    "My Books": new BookList("My Books"),
    "Wishlist": new BookList("Wishlist"),
    "Read": new BookList("Read")
  };
}

export default class BookListManager {
  @observable bookLists = asMap({});

  constructor(id) {
    this.id = id;
    this.namespace = `BookListManager#${this.id}`;
  }

  @computed get serialized() {
    return toJS(this.bookLists);
  }

  @computed get books() {
    return _(this.bookLists.values()).map("books").uniqBy("id").value();
  }

  @action createBookList(name, ...books) {
    if(this.hasBookList(name)) {
      this.addBooksToList(name, ...books);
    } else {
      this.bookLists.add(name, books);
      this.save();
    }
  }

  @action addBooksToList(name, ...books) {
    const bookList = this.bookLists.get(name);
    if(bookList) {
      bookList.push(...books);
      this.save();
    }
  }

  @action load() {
    storage.getItem(this.namespace)
      .then((bookLists) => {
        if(bookLists) {
          this.bookLists = asMap(bookLists);
        } else {
          this.bookLists = asMap(createDefaultBookLists());
        }
      })
      .catch(log);
  }

  save() {
    storage.setItem(this.namespace, this.serialized)
      .catch(log);
  }

  hasBookList(name) {
    return this.bookLists.has(name);
  }
}
