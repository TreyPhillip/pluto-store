import React, { Component } from "react";
import "./Home.css";
import { ItemList } from "../Products/ProductList/ProductList";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      items:[]
    };
  }

  render() {
    return (
      <div className="home-method">
        {/* TODO: Get item card ID mapped to database
        <ItemList items={this.state.items} /> */}
      </div>
    );
  }
}
