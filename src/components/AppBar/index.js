import {React, Component} from "component";
import {inject} from "mobx-react";
import MaterialAppBar from "material-ui/AppBar";
import style from "./style.css";
import FlatButton from "material-ui/FlatButton";
import scanBarcode from "util/scanBarcode";
import books from "books";

@inject("ui")
export default class AppBar extends Component {
  handleScan = () => {
    scanBarcode()
      .then((result) => {
        log("scanBarcode result", result);
        if(result.cancelled) return;
        return books.lookupByISBN(result.text);
      })
      .then((book) => this.props.ui.openBookDialog(book))
      .catch(log);
  }

  render() {
    const {ui} = this.props;

    return (
      <MaterialAppBar
        title={ui.routeTitle}
        iconStyleLeft={{display: "none"}}
        iconElementRight={<FlatButton label="Scan" onClick={this.handleScan}/>}
      />
    );
  }
}
