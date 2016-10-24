import {React, Component} from "component";
import {inject} from "mobx-react";
import {sticky} from "react-sticky";
import MaterialAppBar from "material-ui/AppBar";
import style from "./style.css";
import FlatButton from "material-ui/FlatButton";
import scanBarcode from "util/scanBarcode";
import books from "books";

@inject("ui")
export default class AppBar extends Component {
  static defaultProps = {
    iconStyleLeft: {display: "none"}
  };

  handleScan = () => {
    scanBarcode()
      .then((result) => {
        if(result.cancelled) return;
        return books.lookupByISBN(result.text);
      })
      .then((book) => this.props.ui.openBookDialog(book))
      .catch(log);
  }

  render() {
    const {ui, iconStyleLeft, iconElementLeft, title} = this.props;

    return (
      <sticky className={style.sticky}>
        <MaterialAppBar
          title={title}
          iconElementLeft={iconElementLeft}
          iconElementRight={<FlatButton label="Scan" onClick={this.handleScan}/>}
        />
      </sticky>
    );
  }
}
