import React, { Component } from 'react';
import './Categories.css';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

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
            <div>
                <ListGroup flush>
                    <ListGroupItem tag="a" href={this.state.categories} action>Appliances</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Automotive</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Books</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Cooking</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Electronics and Office</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Fashion</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Garden</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Grocery and Whole Foods</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Home</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Movies and TV Shows</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Music</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Software and Video Games</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Sports and Outdoors</ListGroupItem>
                    <ListGroupItem tag="a" href={this.state.categories} action>Toys and Games</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}