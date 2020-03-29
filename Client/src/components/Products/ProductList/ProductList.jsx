import React from "react";
import './ProductList.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { Container } from "reactstrap";

//Creates the product list using the card component
export const ProductList = props => (
    <Container className="product-list">{props.product.map((product) => <ProductCard key={product.productid} product={product} />)} </Container> 
);

/* 
 <div className="product-list">{props.product.map((product) => 
        <Link to={"/Details/" + props.product.productid}>
        <div>
            <Card className = "card text-white bg-primary mb-3" key={product.id} product={product}>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody className="card-body">
                <CardTitle className="card-title">{props.product.productname}</CardTitle> 
                </CardBody>
            </Card>
        </div>
    </Link>)} 
    </div>
*/