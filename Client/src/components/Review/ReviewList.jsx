import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'

export const ReviewList = props => {
    return (
        <Container className="reviewList">
            <ListGroup>
                <ListGroupItem>
                    <ListGroupItemHeading>
                        <p>User: {props.ratings.accountId}</p>
                        <hr/>
                        <p id='rating'>Rating: {props.ratings.ratingValue}/5</p>
                    </ListGroupItemHeading>
                    <ListGroupItemText id='review'>
                        {props.ratings.reviewInfo} 
                    </ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
        </Container>
    );
};