import React from "react";
import { Link } from 'react-router-dom';
import './ProductCard.css';

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productid}>
            <div className= "product-card">
                <img className='card-img-top' alt='product images' src={props.product.productimagePath}/>
                <p>{props.product.productname}</p>
            </div>
        </Link>
    );
}

