import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap';
import { ProductDetails } from '../Products/ProductDetails/ProductDetails';

export  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
            wishlistItems: JSON.parse(sessionStorage.getItem('wishlist')),
			productDetails: [],
			productId: this.props.itemID,
			productName: this.props.itemName,
			description: this.props.description,
			price: this.props.price,
			linePrice: 0
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/Wishlist")
        .then(res => res.json())
        .then(data => this.setState({ wishlist: data }));
    }
    render() {
        return (
            <Container>
                <ListGroup className="wishlist">
                    <ListGroupItem>
                        <ListGroupItemHeading>{item.productName}</ListGroupItemHeading>
                        <ListGroupItemText>{item.description}</ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                <Button color="danger" class="remove-product" onClick={() => { remove(item.itemID) }}>
                    Remove
                </Button>
            </Container>
        );
    }
}