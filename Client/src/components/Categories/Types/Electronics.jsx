import React, { Component } from 'react';
import Axios from 'axios';
import { ProductList } from '../../Products/ProductList/ProductList'

import {loadUser} from '../../Actions/authAction';
import { connect } from 'react-redux';

 class Electronics extends Component {
    constructor() {
        super();
        this.state = {
          electronics: [],
        };
      }
    //pull data from the backend (database)
    componentDidMount() {
      const {user} = this.props.auth;
      let id  = window.location.href.split('/')[4];

    //var token = cookie.load("token");
    this.props.loadUser();
    Axios.get("http://localhost:5000/getAllProductsByCategory/1")
      .then(data => this.setState({ electronics: data}));
    }
    render() {
        const {user} = this.props.auth;
        console.log(user)
        console.log(this.state.electronics)

        return (
          <div>
             {/*<ProductList product={this.state.electronics} />*/}
          </div>
        )
    }
}

const mapStateToProps = state =>({
	auth: state.auth,
	error:state.error
  })

export default connect(mapStateToProps, {loadUser})(Electronics);
