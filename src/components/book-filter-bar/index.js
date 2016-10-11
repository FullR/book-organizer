import React, {PropTypes} from "react";
import style from "./style.css";
import TextField from "material-ui/TextField";

export default function BookFilterBar(props) {
  const {onSubmit, onChange, value, name, hintText="Search", children} = props;
  let RootComponent = onSubmit ? "form" : "div";

  return (
    <RootComponent className={style.root} onSubmit={onSubmit}>
      <TextField name={name} hintText={hintText} value={value} onChange={onChange} fullWidth/>
    </RootComponent>
  );
}
