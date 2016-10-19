import {React, Component} from "component";
import {inject} from "mobx-react";
import MaterialAppBar from "material-ui/AppBar";
import style from "./style.css";

@inject("ui")
export default class AppBar extends Component {
  render() {
    const {ui} = this.props;

    return (
      <MaterialAppBar title={ui.routeTitle} iconStyleLeft={{display: "none"}}/>
    );
  }
}
