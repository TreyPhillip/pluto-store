import React, { Component } from 'react';
import './Categories.css';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

export class Categories extends Component {
    constructor() {
        super();
        this.state = {
          categories: []
        };
    }
     //pull data from the backend (database)
    componentDidMount() {
        fetch("http://localhost:5000/Categories")
        .then(res => res.json())
        .then(data => this.setState({ categories: data }));
    }
    render() {
        return (
            <ListGroup flush>
                <ListGroupItem tag="a" href="/Appliances" action>Appliances</ListGroupItem>
                <ListGroupItem tag="a" href="/Automotive" action>Automotive</ListGroupItem>
                <ListGroupItem tag="a" href="/Books" action>Books</ListGroupItem>
                <ListGroupItem tag="a" href="/Electronics" action>Electronics</ListGroupItem>
                <ListGroupItem tag="a" href="/Fashion" action>Fashion</ListGroupItem>
                <ListGroupItem tag="a" href="/Garden" action>Garden</ListGroupItem>
                <ListGroupItem tag="a" href="/Food" action>Grocery and Whole Foods</ListGroupItem>
                <ListGroupItem tag="a" href="/Entertainment" action>Music, Movies, and TV Shows</ListGroupItem>
                <ListGroupItem tag="a" href="/Office" action>Office</ListGroupItem>
                <ListGroupItem tag="a" href="/Outdoors" action>Outdoors</ListGroupItem>
                <ListGroupItem tag="a" href="/Software" action>Software and Video Games</ListGroupItem>
                <ListGroupItem tag="a" href="/Sports" action>Sports</ListGroupItem>
            </ListGroup>
        );
    }
}