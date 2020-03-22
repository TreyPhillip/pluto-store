import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Fashion extends Component {
    constructor() {
        super();
        this.state = {
          fashion: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Fashion")
      .then(res => res.json())
      .then(data => this.setState({ fashion: data }));
    }
    render() {
        return (
            <ProductList product={this.state.fashion} />
        )
    }
}
