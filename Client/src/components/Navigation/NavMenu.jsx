import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Logo from '../../assets/Logo.PNG';
import './NavMenu.css';

 class NavMenu extends Component {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
	}
	logoStyle = {
		width:'322',
		height:'67'
	};
	//Toggle for navbar collapsing
	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	componentDidMount(){
		console.log(this.props.status)
	}

	render() {
		return (
			<header>
				<Navbar color="primary" dark>
					<NavbarBrand href="/" className="mr-auto">
						<img src={Logo} className="plutoLogo" alt="Pluto Logo" style={{width:260}}/>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
					<Collapse isOpen={!this.state.collapsed} navbar>
						<Nav navbar>
							<NavItem>
								<NavLink href="/Home" className="text-white">
									Home
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/Login" className="text-white">
									Login
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/Register" className="text-white">
									Register
								</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink href="/Categories" className="text-white">
									Categories
								</NavLink>
							</NavItem>
							
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}

}

export default (NavMenu);

