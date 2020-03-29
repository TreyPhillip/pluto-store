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
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Electronics")
      .then(res => res.json())
      .then(data => this.setState({
        ItemList: data.filter(product => product.productid == productid)}));
    }

    saveData(){
      let data = {};
      data = {
        productId: this.props.productid                              
      }
      //config the header
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
    }    
    render() {
        return (
          <Container>
            {this.state.Electronics.map(electronics => (
              <ProductList key={product.productId} product={product} />
            ))}
          </Container>
        )
    }
}
