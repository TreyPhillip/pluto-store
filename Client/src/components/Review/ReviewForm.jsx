import React, { Component } from 'react'
import axios from 'axios'
import { ReviewList } from './ReviewList'
import { Form, Container, Button } from 'reactstrap';

export class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            reviewComment: '',
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

    handleSubmission = event => {
        event.preventDefault();
        
    //data being saved
    let profile;
    let data = {};

    if (profile != null) {

        profile = profile[2].split(',');

         data = {
            accountid: profile[0],
            productid: this.state.productid,
            reviewcomment: this.state.reviewComment,
            numberrating: parseInt(this.state.rating),
            datereviewed: this.GetDate()
        };
    }
    else {
        data = {
          
            AccountId: 'Guest',
            ProductId: this.props.productId,
            ReviewInfo: this.state.reviewComment,
            RatingValue: parseInt(this.state.rating)
        };
        console.log(data);
    }
    //config the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    ////post request to the backend----
    axios.post("http://localhost:5000/reviews", JSON.stringify(data), config).then(res => {
    alert('Your review has successfully been added.');
    });

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
        return(
            <Container className='reviewWrapper'>
                <Form id='reviewForm' method='POST' onSubmit={this.handleSubmission}>
                    <h3><u>Leave a Review!</u></h3>
                    <select id='ratingValue' onChange={this.RatingHandler} onSubmit={this.handleSubmission}>
                        <option selected value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Starts</option>
                    </select>
                    <br/>
                    <br/>
                    <textarea id='reviewComment' value={this.state.Review} 
                    onChange={this.ReviewChangeHandler} rows='5' cols='50' required />
                    <br/>
                    <br/>
                    <Button type='submit' id='submitReview' color='success' onClick={this.handleSubmission}>Submit Review</Button>
                </Form>
                <div id='reviewList'>
                    <h3><u>Review</u></h3>
                    <h4>{this.calculateAverage()}/5</h4>
                </div>
                    {this.state.ReviewList.map(reviews => (
                        <ReviewList key={reviews.reviewId} reviews={reviews} />
                    ))}
            </Container>
        )
    }
}