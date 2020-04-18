import React, { Component } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import cookie from 'react-cookies';
import Logo from "../../assets/pluto-logo-dark.png";
import "./NavMenu.css";
import {toast} from 'react-toastify';

//redux
import { connect } from "react-redux";
import {logout} from '../Actions/authAction';

 class PrivateMenu extends Component {
  static displayName = PrivateMenu.name;

  constructor(props) {
    super(props);
  
    this.state = {
      collapsed: true
    };

    this.logoutHandler = this.logoutHandler.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  //click handler for logout
  logoutHandler =event =>{
    console.log('hi')
    event.preventDefault();
    sessionStorage.clear();
    this.props.logout();
    toast('Successfully Logged Out');
  }
  //Toggle for navbar collapsing
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar color="primary" dark>
          <NavbarBrand href="/" className="mr-auto">
            <img src={Logo} className="plutoLogo" alt="Pluto Logo" /> Pluto
            Store
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/Home" className="text-white">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.logoutHandler} className="text-white">Logout</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/AddProduct" className="text-white">Add A Product</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/Account" className="text-white">Account</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Categories" className="text-white">Categories</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Cart" className="text-white">Cart</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Wishlist" className="text-white">Wishlist</NavLink>
                </NavItem>
                <NavItem>
								<NavLink href='/Reviews' className='text-white'>Seller Feedback</NavLink>
							</NavItem>
              </Nav>
            </Collapse>
        </Navbar>
      </header>
    );
  };
};

export default connect(null,{logout})(PrivateMenu);