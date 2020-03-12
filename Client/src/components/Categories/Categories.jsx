import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
            <ListGroup>
                <ListGroupItem>
                    <Link to={this.state.categories}>Books</Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={this.state.categories}>Electronics</Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={this.state.categories}>Fashion</Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={this.state.categories}>Sports</Link>
                </ListGroupItem>
            </ListGroup>
        </div>
        );
    }
}