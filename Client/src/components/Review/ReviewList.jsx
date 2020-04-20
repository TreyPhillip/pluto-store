import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'

export const ReviewList = props => {
    return (
        <Container className="reviewList">
            <ListGroup>
                <ListGroupItem>
                    <ListGroupItemHeading>
                        <p>User: {props.seller_sel.value}</p>
                        <hr/>
                        <p id='rating'>Rating: {props.ratings.numberrating}/5</p>
                    </ListGroupItemHeading>
                    <ListGroupItemText id='review'>
                        {props.ratings.reviewcomment} 
                    </ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
        </Container>
    );
};