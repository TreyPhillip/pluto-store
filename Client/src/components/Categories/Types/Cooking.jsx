import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Cooking extends Component {
    constructor() {
        super();
        this.state = {
          cooking: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Cooking")
      .then(res => res.json())
      .then(data => this.setState({ cooking: data }));
    }
    render() {
        return (
            <ProductList product={this.state.cooking} />
        )
    }
}
