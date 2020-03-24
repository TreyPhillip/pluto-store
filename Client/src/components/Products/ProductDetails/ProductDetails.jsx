import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

export class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: [],
            cartItems: []
        };
    }
     //pull data from the backend (database)
     componentDidMount() {
        let productId = this.props.location.pathname.split('/').pop();
        fetch("http://localhost:5000/products/" + productId)
        .then(res => res.json())
        .then(data => this.setState({ productDetails: data[0] }))
        .then(data => console.log(data));
    }
    
    render() {
        return (
            <Container className="productDetails">
                <header>{this.state.productDetails.productname}</header>
                <div className="addToCart">
                    {/* <img className="productImage" alt="product image"/> */}
                    <p className="price">${this.state.productDetails.price}</p>
                    <Button className="btnAddToCart" color='success' onClick={() => { addElementToCart(this.state.productDetails) }}>Add to Cart</Button>
                </div>
                <hr/>
                <div className="description">
                    <h5>{this.state.productDetails.productname} Details</h5>
                    <p className="productDescription">{this.state.productDetails.description}</p>
                </div>
            </Container>
        )
    }
}

function addElementToCart(product) {
    //create cartitem
    let cartItems = [];
    var product = {
        productId: product.productid,
        productName: product.productname,
        price: product.productprice,
        quantity: 1,
        total: product.price * product.quantity
    };
    console.log(product.productName)

    var exist = false

    if (sessionStorage.getItem('cart')) {
        cartItems = JSON.parse(sessionStorage.getItem('cart'));

        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].productId == product.productId) {
                exist = true;
                break;
            }
        }

        if (exist) {
            alert("You already added this item on the list");
        }
        else {
            //add the current item onto the cart list.
            cartItems.push(product);
            //save the cart element to local storage where it can be extracted later
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }
    else {
        //add the current item onto the cart list.
        cartItems.push(product);
        //save the cart element to local storage where it can be extracted later
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
    }
};

