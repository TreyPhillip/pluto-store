import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap';
import { ProductDetails } from '../Products/ProductDetails/ProductDetails';

export  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: [],
            wishlistItems: []
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/Wishlist")
        .then(res => res.json())
        .then(data => this.setState({ wishlist: data.data }));
    }
    render() {
        return (
            <Container>
                <ListGroup className="wishlist">
                    <ListGroupItem>
                        <ListGroupItemHeading>{this.state.productDetails.productname}</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.productDetails.description}</ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                <Button color="danger" class="remove-product" onClick={() => { remove(props.products.productId) }}>
                    Remove
                </Button>
            </Container>
        );
    }
}