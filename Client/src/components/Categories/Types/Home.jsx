import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class home extends Component {
    constructor() {
        super();
        this.state = {
          home: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Home")
      .then(res => res.json())
      .then(data => this.setState({ home: data }));
    }
    render() {
        return (
            <ProductList product={this.state.home} />
        )
    }
}
