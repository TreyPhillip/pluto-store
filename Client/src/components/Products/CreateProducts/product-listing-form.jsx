import React, { Component } from "react";
import "./list_product_style.css";
import { FormGroup } from "reactstrap";
import axios from "axios";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_category: [],
      seller_information: []
    };
    //Click Handler for the submit

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/product/category")
      .then(res => res.json())
      .then(data => this.setState({ product_category: data }));
  }

  handleSubmit = event => {

    let product_obj ={};
    if(isNaN(this.price.value) === false){
        
         product_obj = {
          productname: this.productname.value,
          categoryid: this.category_sel.value,
          sellerid: this.seller_id.value,
          price: this.price.value,
          description: this.description.value
        };
    }
    else{
      alert("Price needs to be a number");
    }


    //validation------------
    //----------------------

    CreateAProduct(product_obj);

    console.log(product_obj);
    event.preventDefault();
  };

  render() {
    return (
      <div className="product-form">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>Product Name: </label>
            <input
              type="text"
              name="product_name"
              ref={data => (this.productname = data)}
              required  />
          </FormGroup>

          <FormGroup>
            <label>Product Category:</label>
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
            <label>Seller account: </label>
            <input
              type="number"
              name="product name"
              ref={seller_id => (this.seller_id = seller_id)}
              required  />
          </FormGroup>

          <FormGroup>
            <label>Price: </label>
            <input
              type="text"
              name="product name"
              ref={price => (this.price = price)}
              required />
          </FormGroup>

          <FormGroup>
            <label>Description: </label>
            <textarea
              name="description"
              ref={description => (this.description = description)}
           required />
          </FormGroup>

          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export function CreateAProduct(data) {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios.post("http://localhost:5000/products/add", data, config).then(res => {
    alert("Successfully listed your product");
  });
  //redirects the view to display the games
  return window.location.reload();
}
