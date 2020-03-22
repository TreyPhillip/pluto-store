import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Decor extends Component {
    constructor() {
        super();
        this.state = {
          decor: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Decor")
      .then(res => res.json())
      .then(data => this.setState({ decor: data }));
    }
    render() {
        return (
            <ProductList product={this.state.Decor} />
        )
    }
}
