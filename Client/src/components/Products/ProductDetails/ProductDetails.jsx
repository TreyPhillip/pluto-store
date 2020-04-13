import React, { Component } from 'react';
import { Button, Container, Toast, Alert } from 'reactstrap';
import axios from 'axios'
import { ReviewForm } from '../../Review/Reviews';
import {connect} from 'react-redux';
import { toast } from 'react-toastify'
import {loadUser} from '../../Actions/authAction'
import { Redirect } from 'react-router';


 class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: [],
            cartItems: [], 
            user:[],
            wishlist:[],
            addToWishlist:false,
            total: JSON.parse(sessionStorage.getItem('subtotal')),

            //wishlist error
            wishlist_error:""
        };
        this.addElementToCart = this.addElementToCart.bind(this);
        this.addElementToWishlist = this.addElementToWishlist.bind(this);
    }
    
     componentDidMount() {
        let productId = this.props.location.pathname.split('/').pop();
        fetch("http://localhost:5000/products/" + productId)
        .then(res => res.json())
        .then(data => this.setState({ productDetails: data[0] }))

        this.props.loaduser();
        //get the user id from redux

        if(this.props.user != null){
            this.setState({user:this.props.user.decoded});
            fetch("http://localhost:5000/wishlist")
            .then(response => response.json())
            .then(data => this.setState({
                wishlist: data.filter(item =>item.accountid == this.props.user.decoded.accountid)}))            
        }
    }
    
    addElementToCart = (product) => {
        
        if(this.props.user === null){
            this.props.history.push('/login')
        }
        
        //create cartitem
        let cartItems = [];
        var product = {
            productId: product.productid,
            imageurl: product.imageurl,
            productName: product.productname,
            categoryId: product.categoryid,
            description: product.description,
            sellerId: product.sellerid,
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
                toast("this item is already in the cart")
            }
            else {
                //add the current product onto the cart list.
                cartItems.push(product);
                //save the cart element to local storage where it can be extracted later
                sessionStorage.setItem("cart", JSON.stringify(cartItems));
                toast(this.state.productDetails.productname + " has been added to the cart")
            }
        }
        else {
            //add the current product onto the cart list.
            cartItems.push(product);
            //save the cart element to local storage where it can be extracted later
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            toast(this.state.productDetails.productname + " has been added to the cart")
        }
    }

        addElementToWishlist = event => {
            event.preventDefault();

            if(this.props.user === null){
                this.props.history.push('/login')
            }
            else{
                const wishlist = this.state.wishlist;
                let isTrue = false;
                //loop through the wishlist to check if the product is already on the list.
                if(wishlist.some(item => item.productid === this.state.productDetails.productid)){
                    isTrue = true;
                }

                console.log(isTrue)
                if(isTrue === true){
                    this.setState({wishlist_error:"The item is already on the wishlist"});
                }
                else{
                    this.setState({wishlist_error:""});
                    //safe to add item to wishlist
                        axios.post("http://localhost:5000/wishlist/add",{
                        accountid:this.state.user.accountid,
                        productid:this.state.productDetails.productid,
                    })
                    .then(res =>{
                        toast(this.state.productDetails.productname + " has been added to the wishlist")
                    })
                }
            }      
        }
        render() {
        return (
            <Container className="productDetails">
            {this.state.wishlist_error ? <Alert color="danger" >{this.state.wishlist_error}</Alert> : null}
                <header>
                    <h1><u>Product Details</u></h1>
                </header>
                <div className="addToCart">
                    <img style={style} src={this.state.productDetails.imageurl}/>
                    <p className='productinfo'>{this.state.productDetails.productname}</p>
                    <p className='productinfo'>${this.state.productDetails.price}</p>
                    <Button className="btnAddToCart" color='success' onClick={() =>
                        { this.addElementToCart(this.state.productDetails) }}>Add to Cart</Button>
                    <Button className="btnAddToWishlist" color='info' onClick={this.addElementToWishlist}>Add to Wishlist</Button>
                </div>
                <br/>
                <div className="description">
                    <h5>{this.state.productDetails.productname} Description</h5>
                    <p className="productDescription">{this.state.productDetails.description}</p>
                </div>
                <hr/>
            </Container>
        )
    }
}

const style={
    width:"200px",
    height:"200px"
}

const mapPropsToState = (state) =>({
    user:state.auth.user
});

const mapDispatchToProps ={
    loaduser:loadUser
};

export default connect(mapPropsToState,mapDispatchToProps)(ProductDetails);




