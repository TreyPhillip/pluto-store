import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import "./Register.css";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
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
    const {
      email,
      password,
      userName,
      firstName,
      lastName,
      address,
      phoneNumber
    } = this.state;
    return (
      <Container className="register">
        <h2>Register</h2>
        <p>* indicates a required field</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email *</Label>
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
          <Label>Address *</Label>
            <Input
              type="text"
              name="address"
              id="addressInput"
              value={address}
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
          <Button  className="btn btn-primary" color="primary" dark onClick={this.validateForm} type="submit">
            Register
          </Button>
          <p>Already have an account?<Link className="btn btn-link" to='/Login'>Log in Here</Link></p>
        </Form>
      </Container>
    );
  }
}
