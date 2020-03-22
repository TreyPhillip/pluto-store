import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Garden extends Component {
    constructor() {
        super();
        this.state = {
          garden: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Garden")
      .then(res => res.json())
      .then(data => this.setState({ garden: data }));
    }
    render() {
        return (
            <ProductList product={this.state.garden} />
        )
    }
}
