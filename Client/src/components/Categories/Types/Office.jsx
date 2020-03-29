import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Office extends Component {
    constructor() {
        super();
        this.state = {
          office: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Office")
      .then(res => res.json())
      .then(data => this.setState({ office: data }));
    }
    render() {
        return (
            <ProductList product={this.state.office} />
        )
    }
}
