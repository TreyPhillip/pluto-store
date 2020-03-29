import React from "react";
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle  } from 'reactstrap';

import './ProductCard.css';

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productid}>
            <Card>
                <CardImg top width="50%" alt="Card image cap" />
                <CardBody>
                <CardTitle>{props.product.productname}</CardTitle>
                <CardSubtitle>${props.product.price}</CardSubtitle> 
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

