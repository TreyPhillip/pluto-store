import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Appliances extends Component {
    constructor() {
        super();
        this.state = {
          appliances: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Appliances")
      .then(res => res.json())
      .then(data => this.setState({ appliances: data }));
    }
    render() {
        return (
            <ProductList product={this.state.appliances} />
        )
    }
}
