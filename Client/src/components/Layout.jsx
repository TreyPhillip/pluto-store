import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu  from '../components/Navigation/NavMenu';
import PrivateMenu from '../components/Navigation/PrivateMenu';

//redux connection & imports
import {connect} from 'react-redux';
import {loadUser} from './Actions/authAction';

 class Layout extends Component {
   
  static displayName = Layout.name;

  componentDidMount(){
      this.props.loadUser();
 }
  render () { 
    const{isAuthenticated, user} = this.props.auth;
      return (
          <div>
            { !isAuthenticated ?
			      	<NavMenu status={isAuthenticated}/> :		
              <PrivateMenu/>}
              
              <Container>
                 {this.props.children}
              </Container>
          </div>
      );
  }
}

const mapStateToProps = state =>({
	auth: state.auth,
	error:state.error
  })

export default connect(mapStateToProps, {loadUser})(Layout);