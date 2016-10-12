import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ready from "util/ready";
import Application from "components/Application";
import store from "store";

require("./base.css");

function entry() {
  ReactDOM.render(
    <MuiThemeProvider>
      <Application store={store}/>
    </MuiThemeProvider>,
    document.querySelector("#app")
  );
}

injectTapEventPlugin();
ready.then(entry);
