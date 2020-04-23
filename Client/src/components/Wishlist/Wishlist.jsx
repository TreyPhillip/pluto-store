import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import './Wishlist.css';


  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
           wishlist:[],
           productDetails: [],
           wishlist_error:"",
        };
    }

    removeItem = (productid) => {
        //remove the product from the wishlist
        let wishlist = this.state.productDetails;
        let wishlist_id = "";
        let removeindex = "";

        for(let i  =0; i < wishlist.length; i++){
            if(wishlist[i].productid === productid){
               wishlist_id = wishlist[i].wishlistid;
               removeindex = i;
            }
        }
        wishlist.splice(removeindex,1);
        this.setState({productDetails:wishlist});
        //removes the product from the database
        const headers = {
            'Authorization': 'Bearer paperboy'
        };
        const data = {
            wishlistid: wishlist_id
        };

        axios.delete('http://localhost:5000/wishlist/delete', {
            headers,
            data
        }).then(res =>{
        
            toast('The product was successfully removed from the wishlist');
            
            //update the wishlist ---- by getting the data from the database table
            fetch("http://localhost:5000/wishlist")
            .then(response => response.json())
            .then(data => {
                //Filter by accountid
               let wishlist = data.filter(item =>item.accountid == this.props.user.decoded.accountid)
               let productData = [];
               //Get products information for each product on the wishlist
               fetch('http://localhost:5000/products')
               .then(response => response.json())
               .then(data =>{                    
                    // gather only the product id to display.....
                    for(let i = 0; i < wishlist.length; i++){
                        for(let k = 0; k < data.length; k++){
                            if(wishlist[i].productid == data[k].productid){
                                data[k]["wishlistid"] = wishlist[i].wishlistid;
                                productData.push(data[k]);
                            }
                        }
                    }
                    this.setState({productDetails:productData, wishlist:wishlist});
               })
            })
        }).catch(err => console.log(err));   
    }

    componentDidMount() {
        //get the wishlist
        fetch("http://localhost:5000/wishlist")
            .then(response => response.json())
            .then(data => {
                //Filter by accountid
               let wishlist = data.filter(item =>item.accountid == this.props.user.decoded.accountid)
               let productData = [];
               //Get products information for each product on the wishlist
               fetch('http://localhost:5000/products')
               .then(response => response.json())
               .then(data =>{                    
                    // gather only the product id to display.....
                    for(let i = 0; i < wishlist.length; i++){
                        for(let k = 0; k < data.length; k++){
                            if(wishlist[i].productid == data[k].productid){
                                data[k]["wishlistid"] = wishlist[i].wishlistid;
                                productData.push(data[k]);
                            }
                        }
                    }
                    this.setState({productDetails:productData, wishlist:wishlist});
               })
            })
    }
    render() {
        return (
            <Container className="wishlist-form">
                <h2>Your Wishlist</h2>
            <ListGroup>
                 {this.state.productDetails.map(item =>
                    (
                     <ListGroupItem>
                         <img src={item.imageurl}/>
                        <ListGroupItemHeading>{item.productname}</ListGroupItemHeading>
                        <ListGroupItem>{item.description}</ListGroupItem>
                        <ListGroupItem>${item.price}</ListGroupItem>
                        <br/>
                        <Button className="remove-item" color="danger" onClick={this.removeItem.bind(this, item.productid)}>Remove</Button>       
                     </ListGroupItem>
                    ))}       
            </ListGroup>
            </Container>
        );
    }
}

const mapPropsToState =(state) => ({
user: state.auth.user
});

export default connect(mapPropsToState)(Wishlist);

              

