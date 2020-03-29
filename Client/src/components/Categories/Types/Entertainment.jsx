import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Entertainment extends Component {
    constructor() {
        super();
        this.state = {
          entertainment: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Entertainment")
      .then(res => res.json())
      .then(data => this.setState({ entertainment: data }));
    }
    render() {
        return (
            <ProductList product={this.state.entertainment} />
        )
    }
}
