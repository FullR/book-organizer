import {uniqBy} from "lodash";
import {observable, action, runInAction} from "mobx";
import books from "books";

export default class BookQuery {
  constructor(query) {
    this.query = query;
  }

  @observable books = [];
  @observable error = null;
  @observable loading = false;

  @action fetch() {
    const {query} = this;
    const startIndex = this.books.length ? this.books.length + 1 : 0;

    if(this.loading) return;

    this.loading = true;
    books.search(query, {startIndex})
      .then((result) => runInAction(() => {
        log("Success", result);
        this.error = null;
        this.books = uniqBy([...this.books, ...result.items], "id");
        this.loading = false;
      }))
      .catch((error) => runInAction(() => {
        log(error);
        this.error = error;
        this.loading = false;
      }));

  }
}
