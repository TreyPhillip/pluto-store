import React, { Component } from 'react';
import './ProductDetails.css'

export class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            productDetails: []
        }
    };
}