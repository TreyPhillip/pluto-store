import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

export  class Categories extends Component {
    constructor() {
        super();
        this.state = {
          categories: []
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/categories")
        .then(res => res.json())
        .then(data => this.setState({ categories: data }));
    }
    render() {
        return (
        <div className="category-method">
            <Link category={this.state.categories}></Link>
        </div>
        );
    }
}