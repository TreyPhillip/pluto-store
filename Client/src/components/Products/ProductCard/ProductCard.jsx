import React from "react";
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import './ProductCard.css';

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productid}>
            <div>
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{props.product.productname}</CardTitle> 
                    </CardBody>
                </Card>
            </div>
        </Link>
    );
}

