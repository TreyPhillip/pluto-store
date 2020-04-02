import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CartDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            productID: this.props.productID,
            description: this.props.description,
            productName: this.props.productName,
            price: this.props.price,
            quantity: this.props.quantity,
            linePrice: this.props.price * this.props.quantity
		};
		this.remove  = this.remove.bind(this);
		this.getLinePrice  = this.getLinePrice.bind(this);
	}
	getLinePrice = (price, quantity) => {
		var linePrice;
		var gPrice = parseInt(price);
		var gQuantity = parseInt(quantity);
		linePrice = gPrice * gQuantity;
		return linePrice
	}
	
	remove = (productId) => {
		var cart = JSON.parse(sessionStorage.getItem('cart'));
	
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].itemID == productId) {
				cart.splice(i, 1);
			}
		}
		sessionStorage.setItem('cart', JSON.stringify(cart));
		window.location.reload();
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
                        onChange={() => {this.setState({
                        	quantity: this.testRef.value,
                        	linePrice: this.state.price * this.testRef.value,
                        })}}
                        
                        type="number" 
                        defaultValue={this.state.quantity} 
                        min="1"></input>
                        </div>
                        <div className="product-removal">
                            <Button color="danger" className="remove-product" onClick={() => { this.remove(this.state.productID) }}>
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
