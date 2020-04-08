import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap';
import { ProductDetails } from '../Products/ProductDetails/ProductDetails';
import axios from 'axios'


export  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
           wishlist:[],
			productDetails: [],
	
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/Wishlist")
        .then(res => res.json())
        .then(data => this.setState({ wishlist: data.data }));
    }
    render() {
        console.log(this.state.wishlist)
        return (
            <Container>
                <ListGroup className="wishlist">
                    <ListGroupItem>
                        <ListGroupItemHeading>{this.state.wishlist.productName}</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.wishlist.description}</ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
              
            </Container>
        );
    }
}