import React, {PropTypes} from "react";
import style from "./style.css";
import {capitalize} from "lodash";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {observer} from "mobx-react";
import SearchPage from "components/search-page";
import AsyncBookPage from "components/async-book-page";
import store from "store";

@observer
export default class Application extends React.Component {
  state = {drawerOpen: false, route: "search"};

  handleChangeRoute = (route) => this.setState({drawerOpen: false, route});
  handleOpenDrawer = () => this.setState({drawerOpen: true});
  handleCloseDrawer = () => this.setState({drawerOpen: false});

  renderRoute() {
    const {route} = this.state;
    const [routeHead, ...params] = route;

    switch(routeHead) {
      case "book-list": return (
        <AsyncBookPage
          bookListSubheader={capitalize(params[0])}
          bookIds={store.getBookList(params[0])}
        />
      );
      default: return (<SearchPage/>);
    }
  }

  render() {
    const {drawerOpen} = this.state;
    const {children} = this.props;

    return (
      <div className={style.root}>
        <AppBar className={style.appBar} title="Books" onLeftIconButtonTouchTap={this.handleOpenDrawer}/>

        <Drawer open={drawerOpen} docked={false} onRequestChange={this.handleCloseDrawer}>
          <MenuItem onClick={this.handleChangeRoute.bind(this, ["search"])}>Search</MenuItem>
          {store.bookListNames.map((bookListName) =>
            <MenuItem key={bookListName} onClick={this.handleChangeRoute.bind(this, ["book-list", bookListName])}>{capitalize(bookListName)}</MenuItem>
          )}
        </Drawer>

        <div className={style.routeContainer}>
          {this.renderRoute()}
        </div>
      </div>
    );
  }
}
