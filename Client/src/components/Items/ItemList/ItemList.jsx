import React from "react";
import './ItemList.css';
import { ItemCard } from '../ItemCard/ItemCard';

//Creates the item list using the card component
export const ItemList = props => (
    <div className="item-list">{props.item.map((item) => <ItemCard key={item.id} item={item} />)} </div>
);