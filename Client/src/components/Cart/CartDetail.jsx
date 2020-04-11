import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CartDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            cartItems: JSON.parse(sessionStorage.getItem('cart')),
            productId: this.props.productId,
            description: this.props.description,
            productName: this.props.productName,
            price: this.props.price,
            quantity: 1,
            maxQuantity: this.props.maxQuantity,
            linePrice: this.props.price * this.props.quantity
		};
        this.remove  = this.remove.bind(this);
        this.onQuantityChange  = this.onQuantityChange.bind(this);
    }
	
	remove = (productId) => {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
    
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].productId == productId) {
                cart.splice(i, 1);
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    
    }
    
    onQuantityChange = async (value) => {
        let subtotal = 0;
        await this.setState({
            quantity: value,
            linePrice: this.state.price * value,            
        });
        console.log(this.state.cartItems)
        await 
        console.log(this.state.cartItems)

        // this.state.cartItems.map((item) => {
        //     subtotal += item.linePrice;
        //     console.log("item.LinePrice " + item.linePrice)
        // });
        // console.log(this.state.cartItems)
        // console.log(this.state.linePrice)
        console.log("subtotal " + subtotal)
    }

	render() {
		return (
			<div>														
                <div>
                    <div className="product">
                        <div className="product-image">
                            <img src="https://homepages.cae.wisc.edu/~ece533/images/watch.png"></img>
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
                            <button color="danger" className="remove-product" onClick={() => { this.remove(this.state.productId) }}>
                                Remove
                            </button>
                        </div>
                    <div className="product-line-price">{this.state.linePrice}</div>
                    </div>			
                </div>	  
			</div>																	
		);
	}
}
