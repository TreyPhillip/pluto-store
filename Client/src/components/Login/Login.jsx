import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import cookie from 'react-cookies';
import Notification from '../Notification';
import "./Login.css";
import { NotificationContainer, NotificationManager } from "react-notifications";

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleSubmit = event => {
    event.preventDefault();
    let date = new Date();
    date.setHours(1);
    //testing loging functionality
    axios.post("http://localhost:5000/authentication",{
      emailaddress: this.state.email,
      userpassword:this.state.password
    })
    //save the token as a cookie
    .then(res => cookie.save('token',res.data.token,{path: '/'}))
    //redirects the user to the homepage
    .then(final => this.props.history.replace('/'))
    .then(res => window.location.reload());
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

  createNotification = (type) =>  {
    return () => {
        switch(type) {
            case 'info': 
                NotificationManager.info();
                break;
            case 'success':
                NotificationManager.success('Success!', 'test message');
                break;
            case 'warning':
                NotificationManager.warning();
                break;
            case 'error':
                NotificationManager.error();
                break;
        }
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container className="login">
        <NotificationContainer />
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
          <Button onClick={this.validateForm, this.createNotification('succcess')} type="submit">
            Login
          </Button>
		<p>Don't have an account? <Link to='/Register'>Register Here</Link></p>
        </Form>
      </Container>
    );
  }
}
