import "babel-polyfill";
import "index.html";
import "base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import {React} from "component";
import ReactDOM from "react-dom";
import ready from "util/ready";
import Application from "components/Application";
import store from "store";
import {reaction} from "mobx";

reaction(() => store.serialized, (state) => log("serialized:", state));

require("./base.css");

function entry() {
  ReactDOM.render(
    <Application store={store}/>,
    document.querySelector("#app")
  );
}

injectTapEventPlugin();
ready.then(entry);
