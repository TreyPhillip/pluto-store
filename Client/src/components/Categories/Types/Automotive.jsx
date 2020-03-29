import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Automotive extends Component {
    constructor() {
        super();
        this.state = {
          automotive: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Automotive")
      .then(res => res.json())
      .then(data => this.setState({ automotive: data }));
    }
    render() {
        return (
            <ProductList product={this.state.automotive} />
        )
    }
}
