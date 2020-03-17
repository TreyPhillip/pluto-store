import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import cookie from 'react-cookies';
import axios from 'axios';



export  class Account extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      validate: {
        emailState: ""
      },     
      account:[]  
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:5000/lastRecord')
   .then(res =>res.json())
   .then(json => this.setState({profile: json}));

   var token = cookie.load("token");
   axios.post("http://localhost:5000/checkToken",{
     tokenString:token
   })
   .then(res => this.setState({account:res.data.decoded, email:res.data.decoded.emailaddress}))
   .catch(err => this.setState({status:false}))
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


  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

    render() {
      console.log(this.state.email)
      //console.log(this.state.account.decoded.emailaddress );
        const {
          email,
          password,
          userName,
          firstName,
          lastName,
          phoneNumber
        } = this.state;
        return (
          <Container className="register">
            <h2>Account Settings</h2>
            <p>* indicates a required field</p>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  id="emailInput"
                  value={this.state.email}
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  onChange={e => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password *</Label>
                <Input
                  type="password"
                  name="password"
                  id="passwordInput"
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>User Name *</Label>
                <Input
                  type="text"
                  name="userName"
                  id="userNameInput"
                  value={userName}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>First Name *</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstNameInput"
                  value={firstName}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name *</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastNameInput"
                  value={lastName}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="phone"
                  name="phoneNumber"
                  id="phoneNumberInput"
                  value={phoneNumber}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <Button onClick={this.validateForm} type="submit">Save</Button>
            </Form>
          </Container>
        );
      }
};
