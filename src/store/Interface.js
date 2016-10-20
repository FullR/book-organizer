import {capitalize} from "lodash";
import {observable, computed, action, asReference} from "mobx";
import hasher from "hasher";
import BookQuery from "./BookQuery";

export default class Interface {
  @observable menuDrawerOpen = false;
  @observable routeInitialized = false;
  @observable route = "";
  @observable bookDialogOpen = false;
  @observable bookDialogBook = asReference(null);
  @observable bookQuery = null;

  @computed get routeTitle() {
    return this.route && this.route.length ? capitalize(this.route) : "Search";
  }

  @action search = (query) => {
    if(!query.trim().length) return;
    const bookQuery = new BookQuery(query);
    this.bookQuery = bookQuery;
    bookQuery.fetch();
  };

  @action extendSearch = () => {
    const {bookQuery} = this;
    if(bookQuery) {
      bookQuery.fetch();
    }
  };

  @action handleRouteChange = (route) => {
    this.route = route;
  };

  @action toggleMenuDrawer = () => this.menuDrawerOpen = !this.menuDrawerOpen;

  @action openBookDialog = (book) => {
    if(book) {
      this.bookDialogBook = book;
      this.bookDialogOpen = true;
    }
  };

  @action closeBookDialog = () => {
    this.bookDialogOpen = false;
    this.bookDialogBook = null;
  }

  changeRoute(route) {
    hasher.setHash(route);
  }

  constructor() {
    hasher.initialized.add(this.handleRouteChange);
    hasher.changed.add(this.handleRouteChange);
    hasher.init();
  }
}
