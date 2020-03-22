import React, { Component } from "react";
import "./HomePage.css";
import { ProductList } from "../Products/ProductList/ProductList";
//toast
import {toast} from 'react-toastify';

//redux
import {connect} from 'react-redux';
 class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  //pull data from the backend (database)
  componentDidMount() {


    if(this.props.isAuthenticated){
      //display toast!
        toast('Successfully Logged in');
    }
    if(this.props.auth.isRegistered){
        toast('Successfully Registered');
    }
    if(this.props.auth.isDeleted){
      toast('Your account has be successfully Deleted')
    }


   
    fetch("http://localhost:5000/Products")
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div className="home-method">
        {/* TODO: Get item card ID mapped to database */}
        {/*<ProductList products={this.state.products} />*/}
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

export default connect(mapStateToProps,null)(HomePage);