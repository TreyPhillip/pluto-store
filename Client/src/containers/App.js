import React, { Component } from 'react';
import { Route, Redirect, Switch,Router } from 'react-router';
import  Layout  from '../components/Layout';
import  HomePage  from '../components/HomePage/HomePage';
import  Login  from '../components/Login/Login';
import Register from '../components/Register/Register';
import Account from '../components/Account/Account';

import { Cart } from '../components/Cart/Cart';
import './App.css';
import {createBrowserHistory} from 'history';

//Add a product page
import 	AddProduct  from '../components/Products/CreateProducts/product-listing-form';
import { Categories } from '../components/Categories/Categories';
//notification
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//connection to the redux store
import {connect} from 'react-redux';
import {loadUser} from '../components/Actions/authAction';
//Account page
import { ProductDetails } from '../components/Products/ProductDetails/ProductDetails';

import PrivateRoute from '../components/PrivateRoutes';

const history = createBrowserHistory();
//only needs to be called once --- required for the toasts work
toast.configure();
 
 class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: [],
			status: false
		};
	}
	
	static displayName = App.name;
	//TODO: Solve Routing Problem in this file and NavMenu. (FINISHED)
	render() {
		const {isAuthenticated, user} = this.props.auth;
		return(
				<div>
					<Router history={history}>
						<Layout/>
						<div className="App">
							<ToastContainer/>
							<Switch>
								<Route path="/HomePage" component={HomePage} />
								<Route exact path="/" component={HomePage} />
								<Route path="/Login" component={Login} />
								<Route path="/Register" component={Register} />
								<Route path="/Cart" component={Cart} />
								<Route path="/Categories" component={Categories} />
								<Route path="/Details/:id" component={ProductDetails} />
								<PrivateRoute path="/AddProduct" isAuthenicated={this.state.status} component={AddProduct} />
								<PrivateRoute path='/Account' isAuthenicated={this.state.status} component={Account} Account={this.state.account}/>
							</Switch>
						</div>
					</Router>
			</div>
		)};
}

const mapStateToProps = state =>({
	auth: state.auth,
	error:state.error
  })

export default connect(mapStateToProps,{loadUser})(App);