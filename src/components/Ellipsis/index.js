import style from "./style.css";
import ReactDotDotDot from "react-dotdotdot";

export default function Ellipsis(props) {
  const {open, maxLength, onExpand, text} = props;

  if(open || text.length <= maxLength) {
    return (<span>{text}</span>)
  }

  return (
    <span onClick={onExpand}>{text.slice(0, maxLength)}...</span>
  );
};
