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
		this.handleSubmit = this.handleSubmit.bind(this);
    }  
    handleSubmit = () => {
        if(this.props.user === null){
            this.props.history.push('/login')
		}
		var subtotal = 0;
		this.state.cartItems.map((item) => {
            subtotal += item.linePrice;
        });
        sessionStorage.setItem("subtotal", JSON.stringify(subtotal));  
		
		this.props.history.push('/Checkout')
    }

	componentDidMount(){
		if(this.state.cartItems != null && this.state.cartItems.length > 0){
			console.log(this.state.cartItems)
		let subtotal = 0;
		this.state.cartItems.map((item) => {
            subtotal += item.linePrice;
		});
		this.setState({
			subtotal: subtotal
		})
	}
	else{
		this.props.history.push('/Cart')
	}
	}

	render(){
		if(this.state.cartItems != null && this.state.cartItems.length > 0){
			return(
			<Form onSubmit={this.handleSubmit}>
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
					sellerId={item.sellerId}
					imageurl={item.imageurl}
					description={item.description}
            		categoryId={item.categoryId}
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
				<Button type="submit" color="success" className="checkout">Checkout</Button>
			</Form>
			)
		}
		else{
			return(
				<Form>
				<h3>Your cart is empty. Add some stuff!</h3>
				</Form>
			)
			
		}
	}	
}	