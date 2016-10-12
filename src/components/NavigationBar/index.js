import style from "./style.css";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import SearchIcon from "material-ui/svg-icons/action/search";
import LibraryBooksIcon from "material-ui/svg-icons/av/library-books";
import StarIcon from "material-ui/svg-icons/toggle/star";

const searchIcon = (<SearchIcon/>);
const libraryBooksIcon = (<LibraryBooksIcon/>);
const starIcon = (<StarIcon/>);

function getNavIndexFromRoute(route) {
  switch(route) {
    case "library": return 1;
    case "wishlist": return 2;
    default: return 0;
  }
}

export default class NavigationBar extends Component {
  routeChangeHandlers = {
    search: () => this.props.store.ui.changeRoute("search"),
    library: () => this.props.store.ui.changeRoute("library"),
    wishlist: () => this.props.store.ui.changeRoute("wishlist"),
  };

  render() {
    const {store, children} = this.props;

    return (
      <BottomNavigation className={style.root} selectedIndex={getNavIndexFromRoute(store.ui.route)}>
        <BottomNavigationItem
          icon={searchIcon}
          label="Search"
          onTouchTap={this.routeChangeHandlers.search}
        />
        <BottomNavigationItem
          icon={libraryBooksIcon}
          label="Library"
          onTouchTap={this.routeChangeHandlers.library}
        />
        <BottomNavigationItem
          icon={starIcon}
          label="Wishlist"
          onTouchTap={this.routeChangeHandlers.wishlist}
        />
      </BottomNavigation>
    );
  }
}
