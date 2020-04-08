import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import {Authenticate_Token} from './Actions/authAction';
import Axios from 'axios';
import cookie from 'react-cookies';

class PrivateRoute extends React.Component{
      
      constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isLoggedIn: false
        };

        // Your axios call here
        let token  = cookie.load('token');

        Axios.post('http://localhost:5000/checkToken',{
        tokenString: token
        })
        .then(res => {
          // For success, update state like
          this.setState(() => ({ isLoading: false, isLoggedIn: true }));
        })
        .catch(err =>{

          // For fail, update state like
          this.setState(() => ({ isLoading: false, isLoggedIn: false }));
        })
    }

    render() {

        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> :
            <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />

    }

}

export default PrivateRoute;