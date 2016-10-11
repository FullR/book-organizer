import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import ReactDOM from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ready from "util/ready";
import Application from "components/application";
import store from "store";

import books from "books";

books.search("cats")
  .then((result) => {
    return result.items[0].id;
  })
  .then(books.lookup)
  .then(log)
  .catch(log);
require("./base.css");

function entry() {
  log("Starting the app");
  ReactDOM.render(
    <MuiThemeProvider>
      <Application store={store}/>
    </MuiThemeProvider>,
    document.querySelector("#app")
  );
}

injectTapEventPlugin();
ready.then(entry);
