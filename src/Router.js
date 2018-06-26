import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RandomBeer from "./RandomBeer";
import Home from "./Home";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/random"} component={RandomBeer} />
          <Route exact path={"/:page?"} component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
