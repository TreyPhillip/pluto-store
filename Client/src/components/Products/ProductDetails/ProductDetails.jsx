import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import axios from 'axios'
import { ReviewForm } from '../../Review/ReviewForm';
import Test from '../../../assets/318x180.svg'

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
    }
    render() {
        return (
            <Container className="productDetails">
                <header>
                    <h1><u>Product Details</u></h1>
                </header>
                <div className="addToCart">
                    <img src={Test} />
                    <p className='productinfo'>{this.state.productDetails.productname}</p>
                    <p className='productinfo'>${this.state.productDetails.price}</p>
                    <Button className="btnAddToCart" color='success' onClick={() => { addElementToCart(this.state.productDetails) }}>Add to Cart</Button>
                    <Button className="btnAddToWishlist" color='info' onClick={() => { addElementToWishlist(this.state.productDetails) }}>Add to Wishlist</Button>
                </div>
                <br/>
                <div className="description">
                    <h5>{this.state.productDetails.productname} Description</h5>
                    <p className="productDescription">{this.state.productDetails.description}</p>
                </div>
                <hr/>
               <ReviewForm/>
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
        price: product.price,
        quantity: 1,
        maxQuantity: product.quantity,
        linePrice: product.price * 1
    };
    console.log(product)

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
            alert("You already added this product on the list");
        }
        else {
            //add the current product onto the cart list.
            cartItems.push(product);
            //save the cart element to local storage where it can be extracted later
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }
    else {
        //add the current product onto the cart list.
        cartItems.push(product);
        //save the cart element to local storage where it can be extracted later
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
    }
}
function addElementToWishlist(product) {
    //create the cart product 
    let wishlist = [];
    var product = {
        wishlistId: getRandomInt(10000),
        productId: product.productid,
        productName: product.productname,
        price: product.price
    };
    let identityAccount = document.cookie.match(new RegExp('(^| )' + 'userId' + '=([^;]+)'));
    if (identityAccount == null) {
        identityAccount = "anonymous";
    }
    else {
        identityAccount = identityAccount[2].split(',');
        identityAccount = identityAccount[0];
    } 

    var stringjson = JSON.stringify(product);

    var Object = {
        wishlistID: product.wishlistId,
        accountID: identityAccount,
        itemInfo: stringjson
    }
    var exist = false;

    if (sessionStorage.getItem('wishlist')) {
        wishlist = JSON.parse(sessionStorage.getItem('wishlist'));

        for (var i = 0; i < wishlist.length; i++) {
            if (wishlist[i].productId == product.productid) {
                exist = true;
                break;
            }
        }

        if (exist) {
            alert("Item is already in wishlist!");
        }
        else {
            //add the current product onto the cart list.
            wishlist.push(product);
            //save the cart element to local storage where it can be extracted later
            sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
            //Add to database
            addToDB(Object);
        }
    }
    else {
        //add the current product onto the cart list.
        wishlist.push(product);
        //save the cart element to local storage where it can be extracted later
        sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
        //Add to database
        addToDB(Object);
    }
}
export function addToDB(data) {
    //add to db
    axios.post("https://localhost:5000/Wishlist/", data).then(res => {
        console.log(res);
        console.log(res.data);
    });
}

//get random number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


