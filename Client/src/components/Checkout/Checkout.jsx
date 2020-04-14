import { Container, Form, Label, Button, Input, Toast, FormGroup } from "reactstrap";
import './Checkout.css';
import axios from 'axios'
import { connect } from 'react-redux';
import React, { Component } from "react";
import {loadUser} from '../Actions/authAction';
import {toast} from 'react-toastify';
var moment = require ('moment')

//pull cartitems from session and create subtotal
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: JSON.parse(sessionStorage.getItem("cart")),
            subtotal: JSON.parse(sessionStorage.getItem("subtotal")),
            payment: [],   
            orderid: 0

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }  
    

    handleSubmit = async (event) => {
    event.preventDefault();
    if(this.props.user === null){
        this.props.history.push('/login')
    }        
    let orders_obj = {};
    let orderdetails_obj = {};
    let purchasehistory_obj = {};
    let productToLower_obj = {};
    let productToDelete_obj = {};
    if(this.state.FirstName !=="" 
    && this.state.LastName !== ""
    && this.state.StreetAddress !==""
    && this.state.City !==""
    && this.state.Country !==""){

         await this.state.cartItems.map( async (item) => {
            orders_obj = {
                buyerid: parseInt(this.props.user.decoded.accountid),
                sellerid: parseInt(item.sellerId),    
                orderdate: moment().format("YYYY-MM-DD"),
                };
                //save order to the database
                await axios.post("http://localhost:5000/orders/add", orders_obj)
                .then(res => {
                //sucess
                })
                .catch(err =>{
                //the product had an issues adding to the database
                console.log(err)           
            }) 

            await axios.get('http://localhost:5000/orders/lastRecord')
            .then(json => this.setState({orderid: json.data[0].orderid}));
            //console.log(json[0])
            //this.setState({orderid: json.data[0].orderid}
            orderdetails_obj = {
                productid: parseInt(item.productId),
                orderid: parseInt(this.state.orderid),
                quantity: parseInt(item.quantity),
                peritemprice: parseInt(item.price),
                };
                //save order to the database
                await axios.post("http://localhost:5000/order/detail/add", orderdetails_obj)
                .then(res => {
                //sucess
                })
                .catch(err =>{
                //the product had an issues adding to the database
                console.log(err)
            })
            
            purchasehistory_obj = {
                buyerid: parseInt(this.props.user.decoded.accountid),
                sellerid: parseInt(item.sellerId),
                shippingaddressid: parseInt('1'),
                productid: parseInt(item.productId),
                datepurchased: moment().format("YYYY-MM-DD"),
                productprice: parseInt(item.price),
                quantity: parseInt(item.quantity),
                };
                //save order to the database
                await axios.post("http://localhost:5000/purchasehistory/add", purchasehistory_obj)
                .then(res => {
                //sucess
                })
                .catch(err =>{
                //the product had an issues adding to the database
                console.log(err)
            })

            var newQuantity = item.maxQuantity - item.quantity;          
            if(newQuantity > 0) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }}
                    console.log(productToLower_obj)
                    console.log(this.state.cartItems)

                    axios.put("http://localhost:5000/products/update", {productname: item.productName,
                    categoryid: parseInt(item.categoryId),
                    sellerid: parseInt(item.sellerId),
                    price: parseInt(item.price),
                    description: item.description,
                    quantity: parseInt(newQuantity),
                    productid: parseInt(item.productId),
                    imageurl: item.imageurl}, config )
                    .then(res => {
                    //sucess
                    })
                    .catch(err =>{
                    //the product had an issues adding to the database
                    console.log(err)
                })
            }
            else{
                const headers = {
                    'Authorization': 'Bearer paperboy'
                };
                const data = {
                    productid: item.productId
                };
                    //save order to the database
                    await axios.delete("http://localhost:5000/products/delete", {headers, data})
                    .then(res => {
                    //sucess
                    })
                    .catch(err =>{
                    //the product had an issues adding to the database
                    console.log(err)
                })
            }

        })
        sessionStorage.clear();
        toast("Order success!")
        this.props.history.push('/Home');
    }
    else{

    }
}

    handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
        [name]: value
    });
    };

    componentDidMount() {
        fetch("http://localhost:5000/payment")
        .then(res => res.json())
        .then(data => 
            {this.setState({payment: 
                data.filter(item => 
                    item.accountid == this.props.user.decoded.accountid)})}
        );

        this.props.loadUser(); 
    }

    render() {
        const {FirstName, LastName, StreetAddress, City, Country} = this.state;
        if(this.state.cartItems != null && this.state.cartItems.length > 0){
			return(
            <Container>
                <h2>Please Confirm Your Order!</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="shoppingCart">                      
                        <div class="column-labels">
                            <Label className="product-image">Image</Label>
                            <Label className="product-details">Product</Label>
                            <Label className="product-price">Price</Label>
                            <Label className="product-quantity">Quantity</Label>
                            <Label className="product-line-price">Line Total</Label>
                        </div>
                        <div>
                        {this.state.cartItems.map((item) => (	
                            <CheckoutDetail
                            key={item.productId} 
                            productId={item.productId}
                            imageurl={item.imageurl}
                            productName={item.productName}
                            price={item.price}
                            quantity={item.quantity}
                            maxQuantity={item.maxQuantity}
                            linePrice={item.linePrice}/>
                        ))}
                        </div>
                    </div>

                    <div className="totals">
                        <div className="totals-item">
                            <label>Total</label>
                            <div className="totals-value" id="cart-subtotal">{this.state.subtotal}</div>
                        </div>
                    </div>

                    <FormGroup>
                        <Label>Select a Payment Option</Label>      
                        <select 
                        className="form-control" 
                        ref={payment_sel => (this.payment_sel = payment_sel)}>
                            {this.state.payment.map(payment => {
                                return (
                                <option key={payment.paymentId} value={payment.paymentId}>
                                    {payment.creditcardnumber}
                                </option>
                                );
                            })}
                        </select>
                    </FormGroup>        
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input
                        type="text"
                        name="First Name"
                        id="First Name"
                        value={FirstName}
                        onChange={e => this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                        type="text"
                        name="Last Name"
                        id="Last Name"
                        value={LastName}
                        onChange={e => this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Street Address</Label>
                        <Input
                        type="text"
                        name="Street Address"
                        id="Street Address"
                        value={StreetAddress}
                        onChange={e => this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>City</Label>
                        <Input
                        type="text"
                        name="City"
                        id="City"
                        value={City}
                        onChange={e => this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Country</Label>
                        <Input
                        type="text"
                        name="Country"
                        id="Country"
                        value={Country}
                        onChange={e => this.handleChange}
                        />
                    </FormGroup>
                        
                    <Button color="info" onClick={() => { this.props.history.goBack()}}>Back</Button>
                    <Button type="submit" color="success">Confirm Order</Button>                  
                </Form>
            </Container>
        )
        }
        else{
            this.props.history.push('/Cart')
        }
        
    }

}

class CheckoutDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId,
            imageurl: this.props.imageurl,
            description: this.props.description,
            productName: this.props.productName,
            price: this.props.price,
            quantity: this.props.quantity,
            maxQuantity: this.props.maxQuantity,
            linePrice: this.props.price * this.props.quantity
        }
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
                            <div className="product-title">
                                {this.state.productName}
                            </div>
                            <p className="product-description">
                                {this.state.description}
                            </p>
                            </div>
                            <div className="product-price">
                                {this.state.price}                        
                            </div>
                            <div className="product-quantity">
                                {this.state.quantity}                        
                            </div>
                            <div className="product-line-price">
                                {this.state.linePrice}
                            </div>
                                                
                    </div>			
                </div>	  
			</div>																	
		);
	}
}

const mapPropsToState = (state) => ({
    user: state.auth.user
    });

export default connect(mapPropsToState, {loadUser})(Checkout);