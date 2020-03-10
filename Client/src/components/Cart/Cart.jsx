import React, { Component } from 'react';
import './Cart.css';
export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div class="shopping-cart">
					<div class="column-labels">
						<label className="image">Image</label>
						<label className="details">Product</label>
						<label className="price">Price</label>
						<label className="quantity">Quantity</label>
						<label className="removal">Remove</label>
						<label className="line-price">Total</label>
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
							<button
								onClick={() => {
									// removeItem(this.state.itemID);
								}}
								class="remove-product"
							>
								Remove
							</button>
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
					<button className="checkout">Checkout</button>
					{/* </Link> */}
				</div>
			</div>
		);
	}
}
