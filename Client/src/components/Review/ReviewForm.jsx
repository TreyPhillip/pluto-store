import React, { Component } from 'react'
import axios from 'axios'
import { ReviewList } from './ReviewList'
import { Form, Container, Button } from 'reactstrap';

export class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rating: 1,
            Review: '',
            ReviewList:[]
        };
        
        //click handlers.
        this.handleSubmission = this.handleSubmission.bind(this);
        this.ReviewChangeHandler = this.ReviewChangeHandler.bind(this);
        this.RatingHandler = this.RatingHandler.bind(this);
        
    }
    //get reviews from database
    componentDidMount() {
        let productId = window.location.href.split('/')[4];

        fetch("http://localhost:5000/reviews")
        .then(response => response.json())
        .then(data => this.setState({
            ReviewList: data.filter(product => product.productid == productid)
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

    handleSubmission(event) {
        event.preventDefault();
    }

    render() {
        return(
            <Container className='reviewWrapper'>
                <Form id='reviewForm' method='POST' onSubmit={this.handleSubmission}>
                    <h3>Leave a Review!</h3>
                    <select id='ratingValue' onChange={this.RatingHandler} onSubmit={this.handleSubmission}>
                        <option selected value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Starts</option>
                    </select>
                    <hr/>
                    <textarea id='reviewComment' value={this.state.Review} onChange={this.ReviewChangeHandler} rows='5' required />
                    <Button type='submit' id='submitReview' color='success'>Submit Review</Button>
                </Form>
                <div id='reviewList'>
                    <h3>Review</h3>
                    <h4>{this.calculateAverage()}/5</h4>
                </div>
                    {this.state.ReviewList.map(reviews => (
                        <ReviewList key={reviews.reviewId} reviews={reviews} />
                    ))}
            </Container>
        )
    }
}