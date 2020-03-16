import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './ProductDetails.css'

function addElementToCart(product) {
    //create cart item
    let cartProducts = [];
    var product = {
        productId: product.productid,
        productName: product.productname,
        price: product.productprice,
        quantity: 1,
        total: product.price * product.quantity
    };

    if (sessionStorage.getItem('cart')) {
        cartProducts = JSON.parse(sessionStorage.getItem('cart'));

        for (var i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].productId == product.productId) {
                exist = true;
                break;
            }
        }
    }
    else {
        //add the current item onto the cart list.
        cartProducts.push(item);
        //save the cart element to local storage where it can be extracted later
        sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
};

export class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: []
        };
    }
     //pull data from the backend (database)
     componentDidMount() {
        let productId = this.props.location.pathname.split('/').pop();
        fetch("http://localhost:5000/" + productId + "/details")
        .then(res => res.json())
        .then(data => this.setState({ details: data }));
    }
    render() {
        return (
            <div className="productDetails">
                <div className="addToCart">
                    <img className="productImage" alt="product image"/>
                    <p className="price">${this.state.productDetails.price}</p>
                    <Button className="btnAddToCart" onClick={() => { addElementToCart(this.state.productDetails) }}>Add to Cart</Button>
                </div>
                <div className="description">
                    <h2>{this.state.productDetails.productName} Details</h2>
                    <p className="productDescription">{this.state.productDetails.productDescription}</p>
                </div>
            </div>
        )
    }
}

