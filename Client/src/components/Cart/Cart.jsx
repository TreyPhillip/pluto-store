import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CartDetail from './CartDetail';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: JSON.parse(sessionStorage.getItem('cart')),
			subtotal: 0
		};
	}
	componentDidMount(){
		let subtotal = 0;
		this.state.cartItems.map((item) => {
            subtotal += item.linePrice;
		});
		this.setState({
			subtotal: subtotal
		})
	}

	render(){
		return(
		<div>
			<div className="shopping-cart">
				<div className="column-labels">
					<label className="product-image">Image</label>
					<label className="product-details">Product</label>
					<label className="product-price">Price</label>
					<label className="product-quantity">Quantity</label>
					<label className="product-removal">Remove</label>
					<label className="product-line-price">Line Total</label>
				</div>
			</div>
			<div>
			{this.state.cartItems.map((item) => (	
				<CartDetail 
				key={item.productId} 
				productId={item.productId} 
				productName={item.productName} 
				price={item.price} 
				quantity={item.quantity}
				maxQuantity={item.maxQuantity}
				linePrice={item.linePrice}/>
			))}
			</div>
			<div className="totals">
				<div className="totals-item">
					<label>Total</label>
					<div className="totals-value" id="cart-subtotal">{this.state.subtotal}</div>
				</div>
			</div>
			<Button color="success" className="checkout">Checkout</Button>
		</div>
		)
	}		
}