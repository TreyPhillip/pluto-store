import React, { Component } from "react";
import "./Home.css";
import { ProductList } from "../Products/ProductList/ProductList";
//toast
import {toast} from 'react-toastify';

//redux
import {connect} from 'react-redux';
import {loadUser} from '../Actions/authAction';

 class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  //pull data from the backend (database)
  componentDidMount() {

    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div className="home-method">
        <ProductList product={this.state.products} />
      </div>
    );
  }
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  auth:state.auth,
  error:state.error
})

export default connect(mapStateToProps,{loadUser})(Home);