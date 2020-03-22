import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Register.css";
import axios from 'axios';

import {connect} from 'react-redux';
import {register} from '../Actions/authAction';

 class Register extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:5000/lastRecord')
   .then(res =>res.json())
   .then(json => this.setState({profile: json}));
  }
  componentWillReceiveProps(nextProps){
    if(this.props.auth.isRegistered !== nextProps.auth.isRegistered ){
        if(nextProps.auth.isRegistered === true){
          this.props.history.push('/Home');
        }
     }
  }

  handleSubmit = event => {
    event.preventDefault();
    //get the new profile id
    let newProfile_id = this.state.profile[0].profileid + 1;
    let response = false;
    //insert the new profile
  //make sure the form is filled.    
    if(this.state.firstName !== "" && this.state.lastname  !== ""  && this.state.phoneNumber  !== "" && 
    this.state.userName !=="" && this.state.lastName !== "" && this.state.userpassword !== "" && newProfile_id !== "")
    {
        console.log(newProfile_id)
        response = addProfileRecord(this.state.firstName,this.state.lastName,this.state.phoneNumber);
        console.log(response);
        if(response === true)
        {
            let username = this.state.userName;
            let email = this.state.email;
            let password = this.state.password;
            let isverified = true
            let profileid = newProfile_id


            //TODO Validate the inputs - password    
            //call the redux function
            this.props.register(username,email,password,isverified,profileid);            
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
              type="text"
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

  function addProfileRecord (firstName,lastName,phoneNumber)
  {

    let result = true;

    try{
        axios.post("http://localhost:5000/profile/add",{
          firstname: firstName,
          lastname: lastName,
          phonenumber: phoneNumber
      })
      result = true;
    }
    catch(error){
      result = false;
    }
       
    return result;
  }

  const mapStateToProps = state =>({
    auth: state.auth,
    error:state.error
    })

  export default connect(mapStateToProps, {register})(Register);