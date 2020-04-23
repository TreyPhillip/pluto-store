import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify'

export default class CartDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            cartItems: [],
            productId: this.props.productId,
            imageurl: this.props.imageurl,
            description: this.props.description,
            sellerId:this.props.sellerId,
            categoryId: this.props.categoryId,
            productName: this.props.productName,
            price: this.props.price,
            quantity: this.props.quantity,
            maxQuantity: this.props.maxQuantity,
            linePrice: this.props.price * this.props.quantity
		};
        this.remove  = this.remove.bind(this);
        this.onQuantityChange  = this.onQuantityChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            cartItems: JSON.parse(sessionStorage.getItem('cart'))
        })
    }
	
	remove = (productId) => {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
    
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId) {
                cart.splice(i, 1);
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.location = window.location; 
    }
    
    onQuantityChange = async (value) => {
        //adjust quantity and line price and log changes
        let subtotal = 0;
        await this.setState({
            quantity: value,
            linePrice: this.state.price * value,            
        });

        //remove the updated item from state cart
        var cart = JSON.parse(sessionStorage.getItem('cart'));    
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId == this.state.productId) {
                cart.splice(i, 1);
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));

        let cartItems = [];
        var product = {
            productId: this.state.productId,
            imageurl: this.state.imageurl,
            description: this.state.description,
            sellerId: this.state.sellerId,
            categoryId: this.state.categoryId,
            productName: this.state.productName,
            price: this.state.price,
            quantity: this.state.quantity,
            maxQuantity: this.state.maxQuantity,
            linePrice: this.state.price * this.state.quantity
        };
        cartItems = JSON.parse(sessionStorage.getItem('cart'));

        //add the current product onto the cart list.
        cartItems.push(product);
        //save the cart element to local storage where it can be extracted later
        sessionStorage.setItem("cart", JSON.stringify(cartItems));   
        this.setState({
            cartItems: JSON.parse(sessionStorage.getItem('cart'))
        })

        console.log(this.state.cartItems)
        
        this.state.cartItems.map((item) => {
            subtotal += item.linePrice;
        });
        sessionStorage.setItem("subtotal", JSON.stringify(subtotal));  
        console.log(subtotal)

        window.location = window.location; 

        // console.log(this.state.cartItems)
        // console.log("state lineprice: " + this.state.linePrice)
        // console.log("subtotal: " + subtotal)
    }

	render() {
		return (
			<div>														
                <div>
                    <div className="product">
                        <div className="product-image">
                            <img src={this.state.imageurl}></img>
                        </div>
                        <div className="product-details">
                            <div className="product-title">{this.state.productName}</div>
                            <p className="product-description">{this.state.description}</p>
                        </div>
                        <div className="product-price">{this.state.price}</div>
                        <div className="product-quantity">
                        <input 
                        ref={testRef => (this.testRef = testRef)} 
                        value={this.state.quantity}
                        onChange={() => {this.onQuantityChange(this.testRef.value)}}                       
                        type="number" 
                        defaultValue={this.state.quantity} 
                        min="1"
                        max={this.state.maxQuantity}></input>
                        </div>
                        <div className="product-removal">
                            <Button color="danger" className="remove-product" onClick={() => { this.remove(this.state.productId) }}>
                                Remove
                            </Button>
                        </div>
                    <div className="product-line-price">{this.state.linePrice}</div>
                    </div>			
                </div>	  
			</div>																	
		);
	}
}
