import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap';
import { ProductDetails } from '../Products/ProductDetails/ProductDetails';
import axios from 'axios'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';


  class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
           wishlist:[],
           productDetails: [],
           wishlist_error:"",
        };
      //  this.removeItem = this.removeItem.bind(this);
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

        console.log(wishlist_id)
        axios.delete('http://localhost:5000/wishlist/delete', {
            headers,
            data
        }).then(res =>{
            console.log(res);
            toast('The product was successfully removed from the wishlist');
        }).catch(err => console.log(err));   
    }

    componentDidMount() {
        fetch("http://localhost:5000/wishlist")
            .then(response => response.json())
            .then(data => {
               let wishlist = data.filter(item =>item.accountid == this.props.user.decoded.accountid)
               let productData = [];
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
            <ListGroup>
                 {this.state.productDetails.map(item =>
                    (
                     <ListGroupItem>
                        <ListGroupItemHeading>{item.productName}</ListGroupItemHeading>
                        <ListGroupItem>{item.description}</ListGroupItem>
                        <ListGroupItem>{item.price}</ListGroupItem>
                        <button className="remove-item" onClick={this.removeItem.bind(this, item.productid)}>Remove</button>       
                     </ListGroupItem>
                    ))}       
            </ListGroup>
        );
    }
}

const mapPropsToState =(state) => ({
user: state.auth.user
});

export default connect(mapPropsToState)(Wishlist);

              

