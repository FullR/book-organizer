import React, {PropTypes} from "react";
import style from "./style.css";

export default function Screen(props) {
  const {children, className} = props;

  return (
    <div className={style.root}>
      {children}
    </div>
  );
}

Screen.propTypes = {};
Screen.defaultProps = {};
