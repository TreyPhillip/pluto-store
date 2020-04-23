/**
 * Name: Register.jsx
 * Purpose: To Display the Registeration form, handle the validation, and server requests.
 * Last updated on April 16, 2020 By Kevin Lucas
 *  */ 

import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "./Register.css";
import {toast} from 'react-toastify';

import axios from 'axios';
import {connect} from 'react-redux';
import {register, createProfile,uniqueUsernameCheck,uniqueEmailCheck} from '../Actions/registerAction';
import {getLastRecord} from '../Actions/authAction';

 class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors:{
        email_error:"",
        password_error:"",
        user_name_error:"",
        first_name_error:"",
        last_name_error:"",
        address_error:"",
        phone_number_error:"",
        empty_form:"",
        profile_submission_error:"",
        account_submission_error:"",
      },
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      profileId:0,
      validate: {
        emailState: ""
      },
      profile:[],
      newestProfileId:0,
      status:false,
      isUnique:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    //check if the user is already logged in redirect the page to home.
    if(this.props.auth.user != null){
      //redirect to homepage
      this.props.history.push('/Home')

    }
  }

  componentWillReceiveProps(nextProps){
      const{errors} = this.state;
      if(this.props.reg.isRegistered !== nextProps.reg.isRegistered ){
          if(nextProps.reg.isRegistered === true ){
            this.props.history.push('/Home')
            toast.success("Successfully the user");
          }
      }


       if(this.props.reg.emailTaken !== nextProps.reg.emailTaken){
         if(nextProps.reg.emailTaken === false){
            this.state.errors.email_error = ""
         }
         if(nextProps.reg.emailTaken === true){
           this.state.errors.email_error = "The Email Has already been registered"
         }
       } 

      if(this.props.reg.usernameTaken !== nextProps.reg.usernameTaken){
        console.log(nextProps.reg.usernameTaken);
        if(nextProps.reg.usernameTaken === false){
          this.setState({isUnique: true});
          this.state.errors.user_name_error = "";
        }
        if(nextProps.reg.usernameTaken === true){
          this.setState({isUnique: false});
          this.state.errors.user_name_error = nextProps.reg_err.msg;
        }
      }

      if(this.props.reg.profile_added_success !== nextProps.reg.profile_added_success){
        if(nextProps.reg.profile_added_success === true){
          this.state.errors.profile_submission_error = "";
            this.setState({status:true});
        }
      }
      //check if the profile submission has errors
      if(this.props.reg_err !== nextProps.reg_err){
        if(nextProps.reg_err.id == "CREATE_PROFILE_FAIL"){
          this.state.errors.profile_submission_error = nextProps.reg_err.msg;
          this.setState({status:false});
        }
          //check if the account has any submission errors
        if(nextProps.reg_err.id == "REGISTER_FAIL"){
          this.state.errors.account_submission_error = nextProps.reg_err.msg;
        }
      }
      this.setState({errors})
  }

  handleSubmit = async event => {
    event.preventDefault();
    const {errors} = this.state;
  
      //state variables
      let username = this.state.userName;
      let email = this.state.email;
      let password = this.state.password;
      let isverified = true
      //regex constants
      const phoneRegex =new RegExp(/\d?(\s?|-?|\+?|\.?)((\(\d{1,4}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)\d{3}(-|\.|\s)\d{4}/);
      const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      //get the new profile id
      
    //make sure the form is filled.    
      if(this.state.firstName !== "" && this.state.lastname  !== ""  && this.state.phoneNumber  !== "" && 
      this.state.userName !=="" && this.state.lastName !== "" && this.state.userpassword !== "")
      {
        //form is filled -- empty the empty_form state
        this.state.errors.empty_form = "";
        this.setState({errors});
        //firstname, lastname, and phonenumber -----------------------------------------------------------------
        if(this.state.firstName.length > 50 || this.state.firstName.length < 2){
          this.state.errors.first_name_error = "First name must be between 2 and 50 characters long";
        }
        else{
          this.state.errors.first_name_error = "";
        }

        if(this.state.lastName.length > 50 || this.state.lastName.length < 2){
          this.state.errors.last_name_error = "Last name must be between 2 and 50 characters long";
        }
        else{
          this.state.errors.last_name_error = "";
        }
        if(!phoneRegex.test(this.state.phoneNumber)){
          this.state.errors.phone_number_error = "Invalid Phone number";
        }
        else{
          this.state.errors.phone_number_error = "";
        }
        //check the password
        if(!passwordRegex.test(password)){
          this.state.errors.password_error = "Strong password must have a number, a special character, a capital letter, a lowercase letter, and be at least 8 characters in length";
        }
        else{
          this.state.errors.password_error = "";
        }

        //check if the username is already taken
          this.props.uniqueUsernameCheck(this.state.userName);
        //check if the email is already registered

          this.props.uniqueEmailCheck(this.state.email);
        //save errors to state
          this.setState({errors});

        //check if there is any profile errors
        if(this.state.errors.phone_number_error === "" && this.state.errors.last_name_error === "" &&
         this.state.errors.first_name_error ===""){
             //check account errors
            if(this.state.errors.password_error === "" && this.state.errors.user_name_error === ""
             && this.state.errors.email_error === ""){

              //Add profile if there are no errors
              this.props.createProfile(this.state.firstName,this.state.lastName,this.state.phoneNumber);

             //if no errors, add the Profile to the database
              if(this.state.errors.profile_submission_error === "" && this.state.errors.user_name_error === "" 
              && this.props.reg.usernameTaken === false && this.state.errors.email_error === ""){
                  //post request --- pull the last record --- default value of 1 if the database is empty.

                  //get the newly added record
                  await axios.get('http://localhost:5000/lastRecord')
                  .then( data =>{
                  this.setState({profile: data.data});
                  });

                  let recentlyAddRecord = 0;
                  if(this.state.profile.length <= 0){
                    recentlyAddRecord = 1;
                  }
                  else{
                    recentlyAddRecord = this.state.profile[0].profileid;
                  }
                  this.props.register(username,email,password,isverified, recentlyAddRecord); 
              }           
            }                                 
         }  
      }
      else{
        this.state.errors.empty_form = "You must fill out the form to register for an account";
        this.setState({errors});
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
      <Container className="registration-form">
          {this.state.errors.empty_form ? <Alert color="danger" >{this.state.errors.empty_form}</Alert> : null}          
        <h2>Register</h2>
        <p>* indicates a required field</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email *</Label>
            <Input
              type="email"
              name="email"
              id="emailInput"
              placeholder="example@email.com"
              value={email}
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              onChange={e => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
            {this.state.errors.email_error ? <Alert color='danger'>{this.state.errors.email_error}</Alert> : null}
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
           {this.state.errors.password_error ? <Alert color="danger" >{this.state.errors.password_error}</Alert> : null}
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
          {this.state.errors.user_name_error ? <Alert color="danger" >{this.state.errors.user_name_error}</Alert> : null}
          </FormGroup>
          <FormGroup>
            <Label>First Name *</Label>
            <Input
              type="text"
              name="firstName"
              id="firstNameInput"
              placeholder="John"
              value={firstName}
              onChange={e => {
                this.handleChange(e);
              }}
            />
           {this.state.errors.first_name_error ? <Alert color="danger" >{this.state.errors.first_name_error}</Alert> : null}
          </FormGroup>
          <FormGroup>
            <Label>Last Name *</Label>
            <Input
              type="text"
              name="lastName"
              id="lastNameInput"
              placeholder="Smith"
              value={lastName}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          {this.state.errors.last_name_error ? <Alert color="danger" >{this.state.errors.last_name_error}</Alert> : null}
          </FormGroup>
          <FormGroup>
          <Label>Address *</Label>
            <Input
              type="text"
              name="address"
              id="addressInput"
              placeholder="123 Main St."
              value={address}
              onChange={e => {
                this.handleChange(e);
              }}
            />
           {this.state.errors.address_error ? <Alert color="danger" >{this.state.errors.address_error}</Alert> : null}
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumberInput"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            {this.state.errors.phone_number_error ? <Alert color="danger" >{this.state.errors.phone_number_error}</Alert> : null}
          </FormGroup>
          <Button onClick={this.validateForm} type="submit">
            Register
          </Button>
        </Form>
      </Container>
    );
  }
};

  const mapStateToProps = state =>({
    reg: state.reg,
    auth:state.auth,
    reg_err:state.reg_err
    })

  export default connect(mapStateToProps, {register, createProfile,uniqueUsernameCheck,uniqueEmailCheck, getLastRecord})(Register);

  