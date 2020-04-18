import React from "react";
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle  } from 'reactstrap';

import './ProductCard.css';
import Test from '../../../assets/318x180.svg'

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productid} className="text-dark">
            <Card outline color="primary">
                <CardImg style={style} src={props.product.imageurl} alt="Card image cap" />
                <CardBody>
                <CardTitle className="text-dark">{props.product.productname}</CardTitle>
                <CardSubtitle className="text-dark">${props.product.price}</CardSubtitle> 
                </CardBody>
            </Card>
        </Link>
    );
}
// <Link to={"/Details/" + props.product.productid}>
//<div className= "product-card">
//<img className='card-img-top' alt='product images' src={props.product.productimagePath}/>
//<p>{props.product.productname}</p>
//</div>
//</Link>

const style ={
    width:'100%',
    height:'200px'
}