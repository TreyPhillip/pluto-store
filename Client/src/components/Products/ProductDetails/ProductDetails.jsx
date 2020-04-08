import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import axios from 'axios'
import { ReviewForm } from '../../Review/ReviewForm';
import {connect} from 'react-redux';



 class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: [],
            cartItems: [], 
            user:[],
        };
        this.addElementToWishlist = this.addElementToWishlist.bind(this);
    }
     //pull data from the backend (database)
     componentDidMount() {
        let productId = this.props.location.pathname.split('/').pop();
        fetch("http://localhost:5000/products/" + productId)
        .then(res => res.json())
        .then(data => this.setState({ productDetails: data[0] }))

        //get the user id from redux
        if(this.props.user != null){
        this.setState({user:this.props.decoded.user});
        }
    }
    
    addElementToWishlist = event => {
        event.preventDefault();

        axios.post("http://localhost:5000/wishlist/add",{
            accountid:this.state.user.accountid,
            productid:this.state.productDetails.productid
        })
      }

        render() {
            
        return (
            <Container className="productDetails">
                <header>
                    <h1><u>Product Details</u></h1>
                </header>
                <div className="addToCart">
                    <p className='productinfo'>{this.state.productDetails.productname}</p>
                    <p className='productinfo'>${this.state.productDetails.price}</p>
                    <Button className="btnAddToCart" color='success' onClick={() =>
                        { addElementToCart(this.state.productDetails) }}>Add to Cart</Button>
                    <Button className="btnAddToWishlist" color='info' onClick={this.addElementToWishlist}>Add to Wishlist</Button>
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
  //     <img src={Test} />

  const mapPropsToState = (state) =>({
    user:state.auth.user
})

export default connect(mapPropsToState)(ProductDetails);

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




