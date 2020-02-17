import React, { Component } from "react";
import "./Home.css";
import { ProductList } from "../Products/ProductList/ProductList";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      products:[]
    };
  }

  render() {
    return (
      <div className="home-method">
        {/* TODO: Get item card ID mapped to database */}
        {/*<ProductList products={this.state.products} />*/} 
      </div>
    );
  }
}
