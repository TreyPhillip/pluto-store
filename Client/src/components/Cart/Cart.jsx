import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: JSON.parse(sessionStorage.getItem('cart')),
			productDetails: []
			//cartItems: []
		};
	}
	componentDidMount() {
		testAddToCart(this.state.productDetails);
		console.log(this.state.cartItems);
	}

	render() {
		return (
			<div>
				<div class="shopping-cart">
					<div class="column-labels">
						<Label className="details">Item</Label>
						<Label className="price">Price</Label>
						<Label className="removal">Remove</Label>
						<Label className="line-price">Total</Label>
					</div>

					{this.state.cartItems &&
						this.state.cartItems.map((item) => (
							<div class="product">
								<div class="details">
									<div class="title">{item.productName}</div>
								</div>
								<div class="price">{item.price}</div>
								{/* <div class="quantity">{item}</div> */}
								<div class="removal">
									<Button color="danger" class="remove-product">
										Remove
									</Button>
								</div>
								<div class="line-price">{'111'}</div>
							</div>
						))}

					{/* <Link to="/"> */}
					<Button color="success" className="checkout">
						Checkout
					</Button>
					{/* </Link> */}
				</div>
			</div>
		);
	}
}
//debug purposes only, will be implemented in product detail page
function testAddToCart(productInfo) {
	let cartItems = [];
	var product = {
		//productID: productInfo.productID
		productID: 1,
		productName: 'Razer Deathadder Elite',
		catrgoryID: 1,
		sellerID: 1,
		price: 99.99,
		description: 'Razer mouse, elite editon'
	};
	var product1 = {
		//productID: productInfo.productID
		productID: 1,
		productName: 'Razer Deathadder',
		catrgoryID: 1,
		sellerID: 1,
		price: 99.99,
		description: 'Razer mouse, standard editon'
	};

	cartItems.push(product);
	cartItems.push(product1);
	sessionStorage.setItem('cart', JSON.stringify(cartItems));
}
