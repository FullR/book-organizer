import style from "./style.css";
import ReactDotDotDot from "react-dotdotdot";

export default function Ellipsis({open, clamp, onExpand, children}) {
  return (
    <span onClick={open ? null : onExpand}>
      {open ?
        children :
        <ReactDotDotDot clamp={clamp}>{children}</ReactDotDotDot>
      }
    </span>
  );
};
