import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Toys extends Component {
    constructor() {
        super();
        this.state = {
          toys: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Toys")
      .then(res => res.json())
      .then(data => this.setState({ toys: data }));
    }
    render() {
        return (
            <ProductList product={this.state.toys} />
        )
    }
}
