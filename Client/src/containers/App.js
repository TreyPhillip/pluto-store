import React, { Component } from 'react';
import { Route, Redirect, Switch,Router } from 'react-router';
import  Layout  from '../components/Layout';
import  Home  from '../components/Home/Home';
import  Login  from '../components/Login/Login';
import Register from '../components/Register/Register';
import Account from '../components/Account/Account';
import {Wishlist} from '../components/Wishlist/Wishlist';

import { Cart } from '../components/Cart/Cart';
import './App.css';
import {createBrowserHistory} from 'history';
//Review Page
import AddReview from '../components/Review/AddReview';
//Add a product page
import 	AddProduct  from '../components/Products/CreateProducts/product-listing-form';
//notification
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//connection to the redux store
import {connect} from 'react-redux';
import {loadUser} from '../components/Actions/authAction';
//Account page
import  ProductDetails from '../components/Products/ProductDetails/ProductDetails';
import PrivateRoute from '../components/PrivateRoutes';
//Category Pages
import { Categories } from '../components/Categories/Categories';
import Appliances from '../components/Categories/Types/Appliances';
import Automotive from '../components/Categories/Types/Automotive';
import Books from '../components/Categories/Types/Books';
import Electronics from '../components/Categories/Types/Electronics';
import Entertainment from '../components/Categories/Types/Entertainment';
import Fashion from '../components/Categories/Types/Fashion';
import Food from '../components/Categories/Types/Food';
import Garden from '../components/Categories/Types/Garden';
import Office from '../components/Categories/Types/Office';
import Outdoors from '../components/Categories/Types/Outdoors';
import Software from '../components/Categories/Types/Software';
import Sports from '../components/Categories/Types/Sports';



const history = createBrowserHistory();
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
		//const {isAuthenticated, user} = this.props.auth;
		return(
				<div>
					<Router history={history}>
						<Layout/>
						<div className="App">
							<ToastContainer/>
							<Switch>
								<Route path="/Home" component={Home} />
								<Route exact path="/" component={Home} />
								<Route path="/Login" component={Login} />
								<Route path="/Register" component={Register} />
								<Route path='/AddReview' component={AddReview} />
								<Route path="/Categories" component={Categories} />
								<Route path="/Details/:id" component={ProductDetails} />
								{/* Category Routes */}
								<Route path="/Appliances" component={Appliances} />
								<Route path="/Automotive" component={Automotive} />
								<Route path="/Books" component={Books} />
								<Route path="/Electronics" component={Electronics} />
								<Route path="/Entertainment" component={Entertainment} />
								<Route path="/Fashion" component={Fashion} />
								<Route path="/Food" component={Food} />
								<Route path="/Garden" component={Garden} />
								<Route path="/Office" component={Office} />
								<Route path="/Outdoors" component={Outdoors} />
								<Route path="/Software" component={Software} />
								<Route path="/Sports" component={Sports} />
								

								<PrivateRoute path="/Cart" component={Cart} exact={true} />
								<PrivateRoute path="/Wishlist" component={Wishlist} exact={true}/>
								<PrivateRoute path="/AddProduct"  component={AddProduct}  exact={true}/>
								<PrivateRoute path='/Account'  component={Account} exact={true}/>
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
export default connect(mapStateToProps, {loadUser})(App);