import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button,Alert, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import axios from "axios";
import "./reviewstyles.css";
import ReviewList from "./ReviewList";
import {connect} from 'react-redux';
import {loadUser} from '../Actions/authAction'
import {toast} from 'react-toastify';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            reviewcomment: '',
            reviewlist:[],
            seller:[]
        };
        
        //click handlers.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.RatingHandler = this.RatingHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);     
        this.fetchReviews = this.fetchReviews.bind(this);  
    }
    //get reviews from database
    componentDidMount() {
        let productId = window.location.href.split('/')[4];

        fetch("http://localhost:5000/reviews/getaccounts")
        .then(res => res.json())
        .then(data => this.setState({ seller: data }));
      this.props.loadUser();     
    }
    fetchReviews = () => {
      let reviewAccountID = this.seller_sel.value
      console.log(reviewAccountID)
      axios.get("http://localhost:5000/reviews/getforaccount/" + reviewAccountID)
        .then(data => this.setState({ reviewlist: data.data }));
        console.log(this.state.reviewlist)
    }
    validateForm = (comment) => {
      if (comment != null){
          return true
      }
      else {
        return false;     
      }
    }

    RatingHandler = (event) => {
        this.setState({
            rating: event.target.value
        });
    }

    ReviewChangeHandler = (event) => {
        this.setState({
            Review: event.target.value
        });
    }

    GetReviewDate() {
        var systemDate = new Date();
        var date = systemDate.getDate() + '/' + (systemDate.getMonth() + 1) + '/' + systemDate.getFullYear().toString().substr(2.2);
        return date;
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
    
          if(this.state.reviewedid !=="" && this.state.numberrating !== "" && this.state.reviewcomment !==""){
              let review_obj ={};
                if(this.validateForm(this.state.reviewcomment) == true){
                  review_obj = {
                  reviewerid: this.props.Auth.user.decoded.accountid,
                  reviewedid: this.seller_sel.value,
                  numberrating: parseInt(this.state.rating),
                  reviewcomment: this.state.reviewcomment,
                  datereviewed:this.GetReviewDate()
                };
    
                console.log(review_obj);
                axios.post("http://localhost:5000/reviews/add", review_obj)  
                .then(res => {
                    //successfully created the review.
                    //create a toast message
                    toast("Review successfully listed")
                })
                .catch(err =>{
                  //the product had an issues adding to the database
                    this.setState({review_err: err.response.data})
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
      const { reviewedid, numberrating, reviewcomment } = this.state;
        return(
          <div>
            <Container className="review-form">
            {this.state.empty_form_error ? <Alert color="danger" >{this.state.empty_form_error}</Alert> : null}
            <h2>Seller Review</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Seller Name: </Label>
                <select onChange={this.fetchReviews}
                  className="form-control "
                  ref={seller_sel => (this.seller_sel = seller_sel)}
                  >
                  <option disabled selected>Select Seller</option>
                  {this.state.seller.map(seller => {
                    return (
                      <option key={seller.accountid} value={seller.accountid}>
                        {seller.username}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
              <FormGroup>
                <Label>Rating: </Label>
                <br />
                <select className="rating" onChange={this.RatingHandler}>
                    <option value='1'>1</option>
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
                    name="reviewcomment"
                    id="reviewcomment"
                    value={reviewcomment}
                    onChange={e => this.handleChange(e)}
                    rows='5'
                    />
                   </Col>
              </FormGroup>
              <Button type="submit" color="info">Submit Review</Button>
            </Form>
            </Container>
            <Container>
              {this.state.reviewlist.map((review) => (
                <ReviewList
                  key={review.reviewid}
                  numberrating={review.numberrating}
                  reviewcomment={review.reviewcomment}
                  datereviewed={review.datereviewed}
                />
              ))}
            </Container>
          </div>
        );
      }
    }
    const mapStateToProps = state =>({
      Auth: state.auth,
      error:state.error
    })
export default connect(mapStateToProps, {loadUser})(Reviews);