import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { Layout } from "../components/Layout";
import { Home } from "../components/Home/Home";
import { Login } from "../components/Login/Login";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../components/Register/Register";
import cookie from 'react-cookies';
import axios from "axios";

//Add a product page
import { AddProduct } from "../components/Products/CreateProducts/product-listing-form";
import { PrivateMenu } from "../components/Navigation/PrivateMenu";


const PrivateRoute = ({component:Component, isAuthenicated,...rest}) =>{
  return(
  <Route {...rest} render={props =>
    //checks  if the the user is authenicated. 
    (isAuthenicated ?
      <Component{...props}/>
      :<Redirect to='/login'/>
    )}/>
  );
};
export default class App extends Component {

    constructor(){
      super();
      this.state ={
        account:[],
        status: true
      }
    }

  componentDidMount(){
      var token = cookie.load("token");
     //console.log("cookie: " + token);

      if(token === undefined){
        this.setState({status:false});
      }
      else{
         //validate the token.... if the token is valid, rendor the login navigates else render the guest view.
         this.setState({status:true});
            // check if the token is valid and pulls the account information to be used.
          axios.post("http://localhost:5000/checkToken",{
            tokenString:  token
            //save the account details in the state.
          }).then(res => this.setState({account:res}));      
      };
  };

  static displayName = App.name;
  //TODO: Solve Routing Problem in this file and NavMenu. (FINISHED)

  render() {
    return (
      <div>
        {/* DO NOT DELETE THESE ROUTER TAGS */}
        <BrowserRouter>
        {!this.state.status ?
          <Layout/> :
          <PrivateMenu/>}
          <div>
            <Route path="/Home" component={Home}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/Register" component={Register}></Route>
            <PrivateRoute path='/AddProduct' isAuthenicated={this.state.status} component={AddProduct} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
