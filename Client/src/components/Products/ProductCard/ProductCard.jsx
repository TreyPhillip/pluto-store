import React from "react";
import { Link } from 'react-router-dom';
import './ProductCard.css';

export const ProductCard = props => {
    return (
        <Link to={"/Details/" + props.product.productId}>
            <div className= "product-card">
                <img className='card-img-top' alt='product images' src={props.product.productImagePath}/>
                <p>{props.product.productName}</p>
            </div>
        </Link>
    );
}

