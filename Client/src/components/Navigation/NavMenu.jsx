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
import Logo from "../../assets/pluto-logo.png";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
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
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            <img src={Logo} className="plutoLogo" alt="Pluto Logo" /> Pluto
            Store
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/Home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/AddProduct">Add A Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Categories">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Cart">Cart</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Wishlist">Wishlist</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
