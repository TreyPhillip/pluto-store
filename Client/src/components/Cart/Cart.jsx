import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CartDetail from './CartDetail';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: JSON.parse(sessionStorage.getItem('cart'))
		};
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
							total={item.total}/>
			))}
			</div>
			{/* <div className="totals">
				{this.state.cartItems.map(item => item.linePrice).reduce((total, item) => item + total)};
					<div className="totals-item">
						<label>Subtotal</label>
				<div className="totals-value" id="cart-subtotal">{}</div>
					</div>
				<div className="totals-item">
				<label>Shipping</label>
				<div className="totals-value" id="cart-shipping">15.00</div>
				</div>
				<div className="totals-item totals-item-total">
				<label>Grand Total</label>
				<div className="totals-value" id="cart-total">114.00</div>
				</div>
			</div> */}
			<Button color="success" className="checkout">Checkout</Button>
		</div>
		)
	}		
}