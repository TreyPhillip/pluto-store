import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Login.css";

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
    return (
      <Container className="Login">
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
          <Button onClick={this.validateForm} type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}
