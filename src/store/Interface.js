import {capitalize} from "lodash";
import {observable, computed, action} from "mobx";
import hasher from "hasher";

export default class Interface {
  @observable menuDrawerOpen = false;
  @observable routeInitialized = false;
  @observable route = "";
  @observable bookDialogOpen = false;
  @observable bookDialogBook = null;

  @computed get routeTitle() {
    return capitalize(this.route);
  }

  @action handleRouteChange = (route) => {
    log(`Route changed to ${route}`);
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
