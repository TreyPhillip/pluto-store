import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Books extends Component {
    constructor() {
        super();
        this.state = {
          books: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Products")
    .then(res =>res.json())
    .then(data =>this.setState({products:data
    .filter(item=>item.categoryid == categoryid) }));
    }
    render() {
        return (
            <ProductList product={this.state.books} />
        )
    }
}
