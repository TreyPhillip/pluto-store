import React, { Component } from "react";
import "./Home.css";
import { ProductList } from "../Products/ProductList/ProductList";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  //pull data from the backend (database)
  componentDidMount() {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div className="home-method">
        {/* TODO: Get item card ID mapped to database */}
        {/*<ProductList products={this.state.products} />*/}
        <ProductList product={this.state.products} />
      </div>
    );
  }
}
