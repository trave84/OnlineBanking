import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { UserIsNotAuthenticated } from "./helpers/auth.jsx";

import "./App.css";
import AppNavbar from "./components/layout/AppNavbar.jsx";
import Dashboard from "./components/layout/Dashboard.jsx";
import AddClient from "./components/clients/AddClient.jsx";
import ClientDetails from "./components/clients/ClientDetails.jsx";
import EditClient from "./components/clients/EditClient.jsx";

import Login from "./components/auth/Login.jsx";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsNotAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsNotAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={UserIsNotAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsNotAuthenticated(EditClient)}
                />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
