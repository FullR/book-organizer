import style from "./style.css";
import {StickyContainer, Sticky} from "react-sticky";
import AppBar from "material-ui/AppBar";
import BookList from "components/BookList";
import BookSearchPage from "components/BookSearchPage";
import Router from "components/Router";
import NavigationBar from "components/NavigationBar";
import BookDetailsDialog from "components/BookDetailsDialog";

export default class Application extends Component {
  render() {
    const {store} = this.props;
    const {ui} = store;

    return (
      <StickyContainer className={style.root}>
        <Sticky className={style.sticky}>
          <AppBar title={ui.routeTitle} iconStyleLeft={{display: "none"}}/>
        </Sticky>
        <div className={style.content}>
          <Router store={store}/>
        </div>
        <div className={style.footer}>
          <NavigationBar store={store}/>
        </div>
        <BookDetailsDialog store={store}/>
      </StickyContainer>
    );
  }
}
