import React, { Component } from 'react';
import './ItemDetails.css'

export class ItemDetails extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            itemDetails: []
        }
    };
}