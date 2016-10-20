import {uniqBy} from "lodash";
import {observable, action, runInAction, asFlat} from "mobx";
import books from "books";

export default class BookQuery {
  constructor(query) {
    this.query = query;
  }

  // books is flat because book instances should never change
  @observable books = asFlat([]);
  @observable error = null;
  @observable loading = false;
  @observable loadingMore = false;

  @action fetch() {
    const {query} = this;
    const startIndex = this.books.length ? this.books.length + 1 : 0;

    if(this.loading) return;

    this.loading = true;
    if(startIndex > 0) {
      this.loadingMore = true;
    }

    books.search(query, {startIndex})
      .then((result) => runInAction(() => {
        this.error = null;
        this.books = uniqBy([...this.books, ...result.items], "id");
        log(this.books);
        this.loading = this.loadingMore = false;
      }))
      .catch((error) => runInAction(() => {
        log(error);
        this.error = error;
        this.loading = this.loadingMore = false;
      }));

  }
}
