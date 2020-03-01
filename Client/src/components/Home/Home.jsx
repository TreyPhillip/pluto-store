import React, { Component } from "react";
import "./Home.css";
import cookie from 'react-cookies';
import axios from "axios";
import { ProductList } from "../Products/ProductList/ProductList";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  //pull data from the backend (database)
  componentDidMount() {

    var token = cookie.load("token");

    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => this.setState({ products: data }));

    // check if the token is valid and pulls the account information to be used.
      axios.post("http://localhost:5000/checkToken",{
        tokenString:  token
        //currently just logged out
      }).then(res => console.log(res));
      

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
