import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Foods extends Component {
    constructor() {
        super();
        this.state = {
          foods: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Foods")
      .then(res => res.json())
      .then(data => this.setState({ foods: data }));
    }
    render() {
        return (
            <ProductList product={this.state.foods} />
        )
    }
}
