import React, {PropTypes} from "react";
import style from "./style.css";
import {debounce} from "lodash";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {observer} from "mobx-react";
import SearchPage from "components/search-page";
import LibraryPage from "components/library-page";

@observer
export default class Application extends React.Component {
  state = {drawerOpen: false, route: "search"};

  handleChangeRoute = (route) => this.setState({drawerOpen: false, route});
  handleOpenDrawer = () => this.setState({drawerOpen: true});
  handleCloseDrawer = () => this.setState({drawerOpen: false});

  renderRoute() {
    const {route} = this.state;
    switch(route) {
      case "library": return (<LibraryPage/>);
      default: return (<SearchPage/>);
    }
  }

  render() {
    const {drawerOpen} = this.state;
    const {children} = this.props;

    return (
      <div className={style.root}>
        <AppBar title="Books" onLeftIconButtonTouchTap={this.handleOpenDrawer}/>

        <Drawer open={drawerOpen} docked={false} onRequestChange={this.handleCloseDrawer}>
          <MenuItem onClick={this.handleChangeRoute.bind(this, "search")}>Search</MenuItem>
          <MenuItem onClick={this.handleChangeRoute.bind(this, "library")}>My Books</MenuItem>
          <MenuItem onClick={this.handleChangeRoute.bind(this, "wishlist")}>Wishlist</MenuItem>
        </Drawer>

        <div className={style.routeContainer}>
          {this.renderRoute()}
        </div>
      </div>
    );
  }
}
