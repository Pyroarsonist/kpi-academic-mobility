import React from "react";
import { hot } from "react-hot-loader/root";

import "./App.css";

import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Layout from "./components/layout";
import Apply from "./components/apply";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/apply">
            <Apply />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default hot(App);
