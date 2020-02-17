import React from "react";
import './ProductList.css';
import { ProductCard } from '../ProductCard/ProductCard';

//Creates the product list using the card component
export const ProductList = props => (
    <div className="product-list">{props.product.map((product) => <ProductCard key={product.id} product={product} />)} </div>
);