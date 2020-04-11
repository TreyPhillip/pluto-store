import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button,Alert, Col } from "reactstrap";
import axios from "axios";
import "./reviewstyles.css";
import {connect} from 'react-redux';
import {loadUser} from '../Actions/authAction'
import {toast} from 'react-toastify';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            reviewComment: '',
            ReviewList:[]
        };
        
        //click handlers.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.RatingHandler = this.RatingHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);

        
    }
    //get reviews from database
    componentDidMount() {
        let productId = window.location.href.split('/')[4];

        fetch("http://localhost:5000/reviews")
        .then(response => response.json())
        .then(data => this.setState({
            ReviewList: data.filter(product => product.productId == productId)
        }));
    }
    RatingHandler(event) {
        this.setState({
            Rating: event.target.value
        });
    }
    ReviewChangeHandler(event) {
        this.setState({
            Review: event.target.value
        });
    }
    GetDate() {
        var systemDate = new Date();
        var date = systemDate.getDay() + '/' + systemDate.getMonth() + '/' + systemDate.getFullYear().toString().substr(2.2);
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
    
          if(this.state.sellerName !=="" && this.state.rating !== "" && this.state.reviewComment !==""){
              let review_obj ={};
                if(this.validateForm(this.state.rating) == true){
                  review_obj = {
                  sellername: this.state.sellerName,
                  sellerid: this.props.Auth.user.decoded.accountid,
                  rating: parseInt(this.state.rating),
                  reviewcomment: this.state.reviewComment
                };
    
                console.log(review_obj);
                axios.post("http://localhost:5000/reviews/add", review_obj)  
                .then(res => {
                    //successfully created the product.
                    //create a toast message
                    toast("Review successfully listed")
                })
                .catch(err =>{
                  //the product had an issues adding to the database
                    this.setState({product_error: err.response.data})
                })
          }
        }
        else{
          this.setState({empty_form_error:"You must fill in the form to add a review"})   
        }
    }

calculateAverage() {
    let reviewList = this.state.ReviewList;
    var result = 0;

    for (var i = 0; i < reviewList.length; i++) {
        result += reviewList[i].ratingValue;
    }
    return (result / reviewList.length).toFixed(2);
}

    render() {
      const { sellerName, rating, reviewcomment } = this.state;
        return(
            <Container className="review-form">
            {this.state.empty_form_error ? <Alert color="danger" >{this.state.empty_form_error}</Alert> : null}
            <h2>Seller Review</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Seller Name: </Label>
                <Input
                  type="text"
                  name="sellerName"
                  id="sellerNameInput"
                  value={sellerName}
                  onChange={e => this.handleChange(e)}
                  />
              </FormGroup>
              <FormGroup>
                <Label>Rating: </Label>
                <br />
                <select className="rating" value={rating} onChange={this.RatingHandler, e => this.handleChange(e)}>
                    <option selected value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label>Review: </Label>
                <Col sm={15}>
                  <Input
                    type="textarea"
                    name="Review"
                    id="reviewInput"
                    value={reviewcomment}
                    onChange={e => this.handleChange(e)}
                    rows='5'
                    />
                   </Col>
              </FormGroup>
              <Button type="submit" color="info">Submit Review</Button>
            </Form>
            </Container>
        );
      }
    }
    const mapStateToProps = state =>({
      Auth: state.auth,
      error:state.error
    })
export default connect(mapStateToProps, {loadUser})(AddReview);