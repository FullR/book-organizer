import {React, Component} from "component";
import CircularProgress from "material-ui/CircularProgress";
import style from "./style.css";

export default class LoadingPage extends Component {
  render() {
    const {children} = this.props;

    return (
      <div className={style.root}>
        <CircularProgress size={100}/>
      </div>
    );
  }
}
