import React, { Component } from 'react';
import './Cart.css';
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: JSON.parse(sessionStorage.getItem("cart")) 
		};
		
	}

	render() {
		return (
			<div>
				<div class="shopping-cart">
					<div class="column-labels">
						<Label className="image">Image</Label>
						<Label className="details">Product</Label>
						<Label className="price">Price</Label>
						<Label className="quantity">Quantity</Label>
						<Label className="removal">Remove</Label>
						<Label className="line-price">Total</Label>
					</div>

					<div class="product">
						<div class="image">
							<img src={this.state.itemImage} />
						</div>
						<div class="details">
							<div class="title">{'test product'}</div>
						</div>
						<div class="price">{'500'}</div>
						<div class="quantity">{'2'}</div>
						<div class="removal">
							<Button color="danger"
								onClick={() => {
									// removeItem(this.state.itemID);
								}}
								class="remove-product">
								Remove
							</Button>
						</div>
						<div class="line-price">{this.state.total}</div>
					</div>

					{/* {this.state.cartItems &&
						this.state.cartItems.map((item) => (
							<CartDetail
								key={item.itemID}
								itemID={item.itemID}
								itemImage={item.itemImage}
								itemName={item.itemName}
								price={item.price}
								quantity={item.quantity}
								total={item.total}
							/>
						))} */}

					{/* <Link to="/"> */}
					<Button color="success" className="checkout">Checkout</Button>
					{/* </Link> */}
				</div>
			</div>
		);
	}
}
