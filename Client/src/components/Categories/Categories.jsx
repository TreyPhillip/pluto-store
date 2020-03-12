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
            <ListGroup flush>
                <ListGroupItem tag="a" href={this.state.categories} action>Books</ListGroupItem>
                <ListGroupItem tag="a" href={this.state.categories} action>Electronics</ListGroupItem>
                <ListGroupItem tag="a" href={this.state.categories} action>Fashion</ListGroupItem>
                <ListGroupItem tag="a" href={this.state.categories} action>Sports</ListGroupItem>
            </ListGroup>
        );
    }
}