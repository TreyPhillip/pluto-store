import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button,Toast,Alert } from "reactstrap";
import Notification from "../Notification";
import "./Login.css";
//redux
import {connect} from 'react-redux';
import {login} from '../Actions/authAction';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors:"",
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){


    if(this.props.error !== nextProps.error){
      if(nextProps.error.id == "LOGIN_FAIL"){
        this.setState({errors:nextProps.error.msg})
      }
    }

    if(this.props.isAuthenticated !== nextProps.isAuthenticated ){
        if(nextProps.isAuthenticated === true){
           this.props.history.push('/Home');
        }
     }
  }

  handleSubmit = event => {
    event.preventDefault();
    //validate the email and password before sending it 
    const{email,password} = this.state;

    if(email === '' || email === undefined && password === '' || password === undefined){
      this.setState({errors: "Email and Password are required"})
    }
    else{
      this.setState({errors:""});
       this.props.login(email,password);
    }
  };

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  validateEmail = e => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRegEx.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  };

  render() {
    const { email, password } = this.state;
    console.log(this.state.errors)
    return (
      <Container className="login">
        {this.state.errors ? <Alert color='danger' text-align="center">{this.state.errors}</Alert> : null}
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="emailInput"
              value={email}
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              onChange={e => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordInput">Password</Label>
            <Input
              type="password"
              name="password"
              id="passwordInput"
              value={password}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <Button className="btn btn-primary" color="primary" dark onClick={this.validateForm, <Notification {...email}/> } type="submit">
            Login
          </Button>
		<p>Don't have an account?<Link className="btn btn-link" to='/Register'>Register Here</Link></p>
        </Form>
      </Container>
    );
  }
}
//map stuff to the props
const mapStateToProps = (state) =>({
  isAuthenticated: state.auth.isAuthenticated,
  error:state.error
})

export default connect(mapStateToProps,{login})(Login);