import {React, Component} from "component";
import Drawer from "material-ui/Drawer";
import style from "./style.css";

export default class BookListDrawer extends Component {
  render() {
    const {open, onClose} = this.props;

    return (
      <Drawer
        docked={false}
        width={window.innerWidth * 0.8}
        open={open}
        onRequestChange={onClose}
      />
    );
  }
}
