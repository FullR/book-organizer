import {React, Component} from "component";
import {StickyContainer} from "react-sticky";
import classNames from "classnames";
import style from "./style.css";

export default class Screen extends Component {
  render() {
    const {className, children} = this.props;

    return (
      <StickyContainer className={classNames(style.root, className)}>
        {children}
      </StickyContainer>
    );
  }
}
