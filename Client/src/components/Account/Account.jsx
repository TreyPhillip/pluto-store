import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button} from "reactstrap";
import cookie from 'react-cookies';
import axios from 'axios';

//redux
import {connect} from 'react-redux';
import {deleteAccount,deleteProfile,updateAccount,updateProfile} from '../Actions/authAction';


  class Account extends Component{

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

    axios.post('http://localhost:5000/profile/',{
        id:this.state.account.profileid
    })
      .then(res => this.setState({firstName:res.data[0].firstname, lastName:res.data[0].lastname, phoneNumber:res.data[0].phonenumber}))
    })
  };
  componentWillReceiveProps(nextProps){
    console.log(this.props.auth)
    //console.log(nextProps)

    if(this.props.isUpdate !== nextProps.isUpdate){
      if(this.props.auth.profileUpdate === true){
      
      }
    }

    if(this.props.isDeleted !== nextProps.isDeleted ){
        if(nextProps.isDeleted === true){
         //  this.props.history.push('/Home');
        }
     }
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

  onSubmit = event =>{
    event.preventDefault();
    //------
    const account={
      firstName:this.state.firstName,
      username: this.state.userName,
      password:this.state.password,
      email:this.state.email,
      isVerified:true,
      profileid:this.state.account.profileid
    }

    //TODO validate inputs before saving
    //profile works
    try{
      this.props.updateProfile(this.state.firstName,this.state.lastName, this.state.phoneNumber, this.state.account.profileid);
      this.props.updateAccount(this.state.userName,this.state.password,this.state.email,true,this.state.account.profileid);
      this.props.history.push('/Home');
    }
    catch(err){
      //display errors
    }


  }
  onDelete = event =>{
      //delete account
      event.preventDefault();

      //TODO confirm the choice / cancel
      //Need to delete the profile
      
      this.props.deleteAccount(this.state.account.accountid); 
      this.props.deleteProfile(this.state.account.profileid)
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
            <h2>Account Settings</h2>
            <p>* indicates a required field</p>
            <Form onSubmit={this.onSubmit}>
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
              <Button onClick={this.onDelete} type="button">Delete</Button>
            </Form>
          </Container>
        );
    }
};

function profileAdd(profileid){

 console.log(profileid);

  let profile = [];
   fetch('http://localhost:5000/profile/' + profileid)
  .then(res =>res.json())
  .then(data => profile = data);
  return profile;

 
}

const mapStateToProps = state =>({
  isDeleted: state.auth.isDeleted,
  profileUpdate: state.auth.profileUpdate,
  isUpdate: state.auth.isUpdate,
  auth: state.auth,
  error:state.error
})

export default connect(mapStateToProps, {deleteAccount,deleteProfile,updateAccount,updateProfile})(Account);