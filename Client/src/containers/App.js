import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "../components/Layout";
import { Home } from "../components/Home/Home";
import { Login } from "../components/Login/Login";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../components/Register/Register";

export default class App extends Component {
  static displayName = App.name;

  //TODO: Solve Routing Problem in this file and NavMenu. (FINISHED)

  render() {
    return (
      <Layout>
        {/* DO NOT DELETE THESE ROUTER TAGS */}
        <BrowserRouter>
          <div>
            <Route path="/Home" component={Home}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/Register" component={Register}></Route>
          </div>
        </BrowserRouter>
      </Layout>
    );
  }
}