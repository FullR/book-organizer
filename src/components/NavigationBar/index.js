import {React, Component} from "component";
import {inject} from "mobx-react";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import SearchIcon from "material-ui/svg-icons/action/search";
import LibraryBooksIcon from "material-ui/svg-icons/av/library-books";
import StarIcon from "material-ui/svg-icons/toggle/star";
import style from "./style.css";

const searchIcon = (<SearchIcon/>);
const libraryBooksIcon = (<LibraryBooksIcon/>);
const starIcon = (<StarIcon/>);

function getNavIndexFromRoute(route) {
  switch(route) {
    case "library": return 1;
    default: return 0;
  }
}

@inject("ui")
export default class NavigationBar extends Component {
  routeChangeHandlers = {
    search: () => this.props.ui.changeRoute("search"),
    library: () => this.props.ui.changeRoute("library")
  };

  render() {
    const {ui, children} = this.props;

    return (
      <BottomNavigation className={style.root} selectedIndex={getNavIndexFromRoute(ui.route)}>
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
      </BottomNavigation>
    );
  }
}
