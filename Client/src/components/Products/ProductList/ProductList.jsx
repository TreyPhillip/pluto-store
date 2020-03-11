import React from "react";
import './ProductList.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

//Creates the product list using the card component
export const ProductList = props => (
    <div className="product-list">{props.product.map((product) => 
        <Link to={"/Details/" + props.product.productid}>
        <div>
            <Card key={product.id} product={product}>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                <CardTitle>{props.product.productname}</CardTitle> 
                </CardBody>
            </Card>
        </div>
    </Link>
    )} </div>
);