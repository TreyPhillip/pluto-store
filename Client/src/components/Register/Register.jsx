import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Register.css";
import axios from 'axios';

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
      },
      profile:[],
      status:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:5000/lastRecord')
   .then(res =>res.json())
   .then(json => this.setState({profile: json}));
  }

  handleSubmit = event => {
    event.preventDefault();

    //get the new profile id
    let status = false;
    let newProfile_id = this.state.profile[0].profileid + 1;
    let response = false;
    //insert the new profile
    let profile ={
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      phoneNumber: this.state.phoneNumber
    }
    if(this.state.firstName !== "" && this.state.lastname  !== ""  && this.state.phoneNumber  !== "" ){
       response = addProfileRecord(profile);
       console.log(response);
    }
    if(response === true){
      //add the account record into the database
        if(this.state.userName !=="" && this.state.lastName !== "" && this.state.userpassword !== "" && newProfile_id !== ""){
        axios.post('http://localhost:5000/account/register', {
            username: this.state.userName,
            emailaddress: this.state.email,
            userpassword: this.state.password,
            isverified: true,
            profileid: newProfile_id,
        })
        .then(final => this.props.history.replace('/'))
        .then(res => window.location.reload())
      }
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
    console.log(this.state.status);
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
          <Button onClick={this.validateForm} type="submit">
            Register
          </Button>
        </Form>
      </Container>
    );
  }
};

  function addProfileRecord (profile_obj)
  {
    try{
      let  IsSuccessful = false;
      axios.post("http://localhost:5000/profile/add",{
          firstname: profile_obj.firstname,
          lastname: profile_obj.lastname,
          phonenumber: profile_obj.phonenumber
      });
    }
    catch(err){
      return false;
    }
    return true;
  }