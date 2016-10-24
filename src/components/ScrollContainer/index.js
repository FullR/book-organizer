import {React, Component} from "component";
import classNames from "classnames";
import style from "./style.css";

export default class ScrollContainer extends Component {
  render() {
    const {children, className} = this.props;

    return (
      <div className={classNames(style.root, className)}>
        {children}
      </div>
    );
  }
}
