import {React, Component} from "component";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Provider} from "mobx-react";
import {StickyContainer, Sticky} from "react-sticky";
import AppBar from "components/AppBar";
import BookSearchPage from "components/BookSearchPage";
import Router from "components/Router";
import NavigationBar from "components/NavigationBar";
import BookDetailsDialog from "components/BookDetailsDialog";
import {ui, library, wishlist} from "store";
import style from "./style.css";

export default class Application extends Component {
  render() {
    return (
      <Provider ui={ui} library={library} wishlist={wishlist}>
        <MuiThemeProvider>
          <StickyContainer className={style.stickyContainer}>
            <Sticky className={style.sticky}>
              <AppBar/>
            </Sticky>
            <div className={style.content}>
              <Router/>
            </div>
            <div className={style.footer}>
              <NavigationBar/>
            </div>
            <BookDetailsDialog/>
          </StickyContainer>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
