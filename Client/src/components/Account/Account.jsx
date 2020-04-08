import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Alert} from "reactstrap";
import cookie from 'react-cookies';
import axios from 'axios';

//redux
import {connect} from 'react-redux';
import {deleteAccount,updateAccount,loadUser,getProfile,updateProfile,deleteProfile} from '../Actions/authAction';

  class Account extends Component{

  constructor(props) {
    super(props);
    this.state = {
      profileid:"",
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      validate: {
        emailState: ""
      }, 
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
      account:[],
      profile:[]  
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

   var token = cookie.load("token");
   axios.post("http://localhost:5000/checkToken",{
     tokenString:token
   }).then((res) =>{
      this.setState({account:res.data.decoded, email:res.data.decoded.emailaddress, userName:res.data.decoded.username });
   }).then(data =>{
    this.props.getProfile(this.state.account.profileid);
    axios.post('http://localhost:5000/profile/',{
        id:this.state.account.profileid
    })
      .then(res => this.setState({firstName:res.data[0].firstname, lastName:res.data[0].lastname, phoneNumber:res.data[0].phonenumber, profileid:res.data[0].profileid}))
    })
  };

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };


//Validations-----------------------------------
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
//----------------------------------------------

  onSubmit = event =>{
    event.preventDefault();

    const{errors} = this.state;

    if(this.state.firstName !== "" && this.state.lastname  !== ""  && this.state.phoneNumber  !== "" && 
    this.state.userName !=="" && this.state.lastName !== "" && this.state.password !== "")
    {
      //profile works
      

      let newProfile_id = this.state.profile.profileid + 1;
      //state variables
      let username = this.state.userName;
      let email = this.state.email;
      let password = this.state.password;
      let isverified = true
      let profileid = newProfile_id
      //regex constants
      const phoneRegex =new RegExp(/\d?(\s?|-?|\+?|\.?)((\(\d{1,4}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)\d{3}(-|\.|\s)\d{4}/);
      const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      //get the new profile id
    
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
        //Password
        if(!passwordRegex.test(password)){
          this.state.errors.password_error = "Strong password must have a number, a special character, a capital letter, a lowercase letter, and be at least 8 characters in length";
        }
        else{
          this.state.errors.password_error = "";
        }
        //check if the username is already taken
          this.props.uniqueUsernameCheck(this.state.userName);

          if(this.state.isUnique){
            //display an error message
          }
      
          this.setState({errors});
      try{
        this.props.updateProfile(this.state.firstName,this.state.lastName, this.state.phoneNumber, this.state.account.profileid);
        this.props.updateAccount(this.state.userName,this.state.password,this.state.email,true,this.state.account.profileid);
        this.props.history.push('/Home');
      }
      catch(err){
        //display errors
      }
    }
    else{
      this.state.errors.empty_form = "You must filled out the form to update your account";
      this.setState({errors});
    }
  }
  onDelete = event =>{
      //delete account
      event.preventDefault();

      //TODO confirm the choice / cancel
      //Need to delete the profile
      try{
        this.props.deleteAccount(this.state.account.accountid); 
        this.props.deleteProfile(this.state.account.profileid);
      }
      catch(error){
        //display errors
      }
  }
  render() {
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
            {this.state.errors.empty_form ? <Alert color="danger" >{this.state.errors.empty_form}</Alert> : null}
            <h2>Account Settings</h2>
            <p>* indicates a required field</p>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Email *</Label>
                <Input
                  disabled
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
                  value={lastName}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                {this.state.errors.last_name_error ? <Alert color="danger" >{this.state.errors.last_name_error}</Alert> : null}
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
                {this.state.errors.phone_number_error ? <Alert color="danger" >{this.state.errors.phone_number_error}</Alert> : null}
              </FormGroup>
              <Button onClick={this.validateForm} type="submit" color='success'>Save</Button>
              <Button onClick={this.onDelete} type="button" color='danger'>Delete</Button>
            </Form>
          </Container>
        );
    }
};


const mapStateToProps = state =>({
  isDeleted: state.auth.isDeleted,
  profileUpdate: state.auth.profileUpdate,
  isUpdate: state.auth.isUpdate,
  auth: state.auth,
  profile:state.auth.profile,
  error:state.error
});

export default connect(mapStateToProps, {deleteAccount,deleteProfile,getProfile,loadUser,updateAccount,updateProfile})(Account);