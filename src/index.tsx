import React from "react";
import ReactDOM from "react-dom";
import "src/assets/styles/global.scss";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// PWA Unregistered
serviceWorker.unregister();
