import React from "react";
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle  } from 'reactstrap';

import './ProductCard.css';

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productid}>
            <div>
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{props.product.productname}</CardTitle>
                    <CardSubtitle>{props.product.productprice}</CardSubtitle> 
                    </CardBody>
                </Card>
            </div>
        </Link>
    );
}
// <Link to={"/Details/" + props.product.productid}>
//<div className= "product-card">
//<img className='card-img-top' alt='product images' src={props.product.productimagePath}/>
//<p>{props.product.productname}</p>
//</div>
//</Link>

