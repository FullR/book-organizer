import React, {PropTypes} from "react";
import style from "./style.css";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {observer} from "mobx-react";

@observer
export default class Application extends React.Component {
  state = {drawerOpen: false};

  openDrawer = () => this.setState({drawerOpen: true});
  closeDrawer = () => this.setState({drawerOpen: false});

  render() {
    const {drawerOpen} = this.state;
    const {children, store} = this.props;

    return (
      <div className={style.root}>
        <AppBar title="Books" onLeftIconButtonTouchTap={this.openDrawer}/>

        <Drawer open={drawerOpen} docked={false} onRequestChange={this.closeDrawer}>
          <MenuItem>Search</MenuItem>
          <MenuItem>My Books</MenuItem>
          <MenuItem>Wishlist</MenuItem>
        </Drawer>

        <div>
          {children}
        </div>
      </div>
    );
  }
}
