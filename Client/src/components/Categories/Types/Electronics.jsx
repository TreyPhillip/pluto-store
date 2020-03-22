import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Electronics extends Component {
    constructor() {
        super();
        this.state = {
          electronics: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Electronics")
      .then(res => res.json())
      .then(data => this.setState({ electronics: data }));
    }
    render() {
        return (
            <ProductList product={this.state.electronics} />
        )
    }
}
