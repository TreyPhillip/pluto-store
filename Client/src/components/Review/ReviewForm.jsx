import React, { Component } from 'react'
import axios from 'axios'
import { ReviewList } from './ReviewList'

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

    handleSubmission(event) {
        event.preventDefault();
    }
}