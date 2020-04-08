import React from "react";
import './ProductList.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { Container } from "reactstrap";

//Creates the product list using the card component
export const ProductList = props => (
<div>
    <Container className="product-list">{props.product.map((product) => <ProductCard key={product.productid} product={product} />)} </Container> 
</div>

);
