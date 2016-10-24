import {React, Component} from "component";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Provider} from "mobx-react";
import {StickyContainer} from "react-sticky";
import AppBar from "components/AppBar";
import BookSearchPage from "components/BookSearchPage";
import Router from "components/Router";
import NavigationBar from "components/NavigationBar";
import BookDetailsDialog from "components/BookDetailsDialog";
import ScrollContainer from "components/ScrollContainer";
import {ui, library, wishlist, bookListManager} from "store";
import style from "./style.css";

{/* <AppBar/>
<ScrollContainer>
  <Router/>
</ScrollContainer> */}

export default class Application extends Component {
  render() {
    return (
      <Provider ui={ui} library={library} wishlist={wishlist} bookListManager={bookListManager}>
        <MuiThemeProvider>
          <div className={style.root}>
            <Router/>
            <div className={style.footer}>
            <NavigationBar/>
            </div>
            <BookDetailsDialog/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
