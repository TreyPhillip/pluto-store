import React from "react";
import { Link } from 'react-router-dom';
import './ItemCard.css';

export const ItemCard = props => {
    return (
        <Link to={"/Details/" + props.item.itemId}>
            <div className= "item-card">
                <img className='card-img-top' alt='item images' src={props.item.itemImagePath}/>
                <p>{props.item.itemName}</p>
            </div>
        </Link>
    );
}

