import React, { Component } from "react";
import "./list_product_style.css";
import { Container, Form, FormGroup, Label, Input, Button,Toast } from "reactstrap";
import axios from "axios";

import {connect} from 'react-redux';
import {loadUser} from '../../Actions/authAction'
import {toast} from 'react-toastify';


 class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_category: [],
      seller_information: [],
      productName: "",
      categoryid: "",
      sellerid: "",
      price: "",
      description: ""
    };
    //Click Handler for the submit

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm  = this.validateForm.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/product/category")
      .then(res => res.json())
      .then(data => this.setState({ product_category: data }));

      this.props.loadUser();
  
  }
  validateForm = (price) => {
    const priceRegex = /^^\d+(?:[.,]\d+)*$/
    if (priceRegex.test(price)){
        return true
    }
    else {
      return false;     
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

  handleSubmit = event => {
   // console.log(this.props.Auth.user.decoded.profileid)
   console.log(this.state.price);
    let product_obj ={};
    if(this.validateForm(this.state.price) == true){
      product_obj = {
       productname: this.state.productName,
       categoryid: this.category_sel.value,
       sellerid: this.props.Auth.user.decoded.profileid,
       price: parseInt(this.state.price),
       description: this.state.description
     };
     CreateAProduct(product_obj);
    }
    else{
   toast("Price needs to be a number");
 }

    //validation------------
    //----------------------

    console.log(product_obj);
    event.preventDefault();
  };

  render() {
    const { productName, category, price, description } = this.state;
    return (
      <Container className="product-form">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Product Name: </Label>
            <Input
              type="text"
              name="productName"
              id="productNameInput"
              value={productName}
              onChange={e => this.handleChange(e)}
              required  />
          </FormGroup>
          <FormGroup>
            <Label>Product Category:</Label>
            <select
              className="form-control "
              ref={category_sel => (this.category_sel = category_sel)}
              required  >
              {this.state.product_category.map(category => {
                return (
                  <option key={category.categoryid} value={category.categoryid}>
                    {category.categoryname}
                  </option>
                );
              })}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Price: </Label>
            <Input
              type="text"
              name="price"
              id="priceInput"
              value={price}
              onChange={e => this.handleChange(e)}
              required />
          </FormGroup>
          <FormGroup>
            <Label>Description: </Label><br></br>
            <textarea
              rows="4" 
              cols="50"
              name="description"
              id="descriptionId"
              value={description}
              onChange={e => this.handleChange(e)}
           required />
          </FormGroup>
          <Button type="submit" color="info">Add Product</Button>
        </Form>
        </Container>
    );
  }
}

const mapStateToProps = state =>({
  Auth: state.auth,
  error:state.error
})


export function CreateAProduct(data) {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios.post("http://localhost:5000/products/add", data, config).then(res => {
    alert("Successfully listed your product");
  });
  //redirects the view to display the products
  return window.location.reload();
}
export default connect(mapStateToProps, {loadUser})(AddProduct);