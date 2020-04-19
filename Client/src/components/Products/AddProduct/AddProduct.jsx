import React, { Component } from "react";
import "./AddProduct.css";
import { Container, Form, FormGroup, Label, Input, Button, Alert, FormText, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import axios from "axios";

import {connect} from 'react-redux';
import {loadUser} from '../../Actions/authAction'
import {toast} from 'react-toastify';

//image imports
import {storage} from '../../../firebase-config';

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
      description: "",
      quantity: "",
      //error messages
      empty_form_error:"",
      product_error:"",
      //image state
      imageAsFile:null,
      imageUrl:null,
      imagePreview:null,

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
    event.preventDefault();
      if(this.state.productName !=="" && this.state.price !== "" && this.state.description !==""){
            //IMAGE------------------------------------
            if(this.state.imageAsFile === '' ) {
              console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
            }

            let product_obj ={};
            if(this.validateForm(this.state.price) == true){
            const uploadTask = storage.ref(`/images/${this.state.imageAsFile.name}`).put(this.state.imageAsFile)
            //Uploading file to firebase storage
            uploadTask.on('state_changed', 
            (snapShot) => {
              //takes a snap shot of the process as it is happening
              console.log(snapShot)
            }, (err) => {
              //catches the errors
              console.log(err)
            }, () => {
              // gets the functions from storage refences the image storage in firebase by the children
              // gets the download url then sets the image from firebase as the value for the imgUrl key:
              storage.ref('images').child(this.state.imageAsFile.name).getDownloadURL()
              .then(fireBaseUrl => {
                this.setState({imageUrl: fireBaseUrl})
                //setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            })
            .then(save =>{
                    
                  product_obj = {
                      productname: this.state.productName,
                      categoryid: this.category_sel.value,
                      sellerid: this.props.Auth.user.decoded.accountid,
                      price: parseInt(this.state.price),
                      description: this.state.description,
                      quantity: parseInt(this.state.quantity),
                      imageurl: this.state.imageUrl
                    };
                    console.log(product_obj);
                          //save product to the database
                    axios.post("http://localhost:5000/products/add", product_obj)  
                    .then(res => {
                      //sucess
                      toast("Product successfully listed")
                      window.setTimeout(function(){
                        window.location.href = "/Home";
                      }, 3000)
                    })
                    .catch(err =>{
                    //the product had an issues adding to the database
                    this.setState({product_error: err.response.data})
                }) 
                console.log(product_obj)
            }) 
        })
      }
    }
    else{
      this.setState({empty_form_error:"You must fill in the form to add a product"})   
    }
}

  render() {
    const { productName, category, price, quantity, description } = this.state;
    
      const  handleImageAsFile = async (e) => {

          const image = e.target.files[0]
          this.setState({imageAsFile: image})

          console.log(image);

        if(image === undefined){
          this.setState({imagePreview: null});
        }

        if(image != undefined){
          if(!this.state.imageAsFile){
              this.setState({imagePreview: URL.createObjectURL(image)})
          }
        } 
      }
    return (
      <Container className="product-form">
        {this.state.empty_form_error ? <Alert color="danger" >{this.state.empty_form_error}</Alert> : null}
        <h2>Add a Product</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Product Name: </Label>
            <Input
              type="text"
              name="productName"
              id="productNameInput"
              value={productName}
              onChange={e => this.handleChange(e)}
              />
          </FormGroup>
          <FormGroup>
            <Label>Product Category:</Label>
            <select
              className="form-control "
              ref={category_sel => (this.category_sel = category_sel)}
              >
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
            <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              name="price"
              id="priceInput"
              value={price}
              onChange={e => this.handleChange(e)}
               />
               </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>Quantity: </Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={e => this.handleChange(e)}
               />
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
            />
          </FormGroup>
          <FormGroup>
             <input type="file" className="Process__Upload_btn" 
                onChange={handleImageAsFile}></input>
             <img src={this.state.imagePreview} style={styles} alt="upload image" className="upload_image"
             />
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

const styles = {
  weight: '200px',
  height: '200px'
}

export default connect(mapStateToProps, {loadUser})(AddProduct);