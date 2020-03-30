import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { ProductDetails } from '../Products/ProductDetails/ProductDetails';

export  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
          wishlist: []
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/Wishlist")
        .then(res => res.json())
        .then(data => this.setState({ categories: data }));
    }
    render() {
        return (
            <ListGroup flush>
                <ListGroupItem>{ProductDetails.productname}</ListGroupItem>
            </ListGroup>
        );
    }
}