import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Sports extends Component {
    constructor() {
        super();
        this.state = {
          sports: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Sports")
      .then(res => res.json())
      .then(data => this.setState({ sports: data }));
    }
    render() {
        return (
            <ProductList product={this.state.sports} />
        )
    }
}
