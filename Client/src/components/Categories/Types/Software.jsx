import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Software extends Component {
    constructor() {
        super();
        this.state = {
          software: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Software")
      .then(res => res.json())
      .then(data => this.setState({ software: data }));
    }
    render() {
        return (
            <ProductList product={this.state.software} />
        )
    }
}
