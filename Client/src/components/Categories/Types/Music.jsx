import React, { Component } from 'react';
import ProductList from '../../Products/ProductList/ProductList'

export class Music extends Component {
    constructor() {
        super();
        this.state = {
          music: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
    var token = cookie.load("token");
    fetch("http://localhost:5000/Music")
      .then(res => res.json())
      .then(data => this.setState({ music: data }));
    }
    render() {
        return (
            <ProductList product={this.state.music} />
        )
    }
}
