
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Pages/LoginPage";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();
const token = localStorage.getItem('tokenSRIAPP')



if (token) {
  ReactDOM.render(  
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(  
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
}
