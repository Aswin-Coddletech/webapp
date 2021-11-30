import * as React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { addLocationQuery } from "./helpers/routeParams";

import api from "./api";
import Routes from "./routes";
import configureStore from "./redux/store";

import HomePage from "./pages/HomePage";
import CognitoCallback from "./components/CognitoCallback";

const history = createBrowserHistory();

addLocationQuery(history);

history.listen(location => {
  addLocationQuery(history);
});

const store = configureStore(api, history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/callback" component={CognitoCallback} />
            <Routes />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
