import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'
import { Container } from 'reactstrap';

export class Electronics extends Component {
    constructor() {
        super();
        this.state = {
          electronics: [],
        };
      }
    //pull data from the backend (database)
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
              <ProductList product={this.state.electronics} />
          )
      }
}
