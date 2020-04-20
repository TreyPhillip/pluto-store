import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'

export default class Reviewlist extends Component {
  constructor(props) {
		super(props);
		this.state = {
            reviewlist: [],
            rating: this.props.rating,
            reviewcomment: this.props.reviewcomment,
            datereviewed: this.props.datereviewed
    };
  }
  render() {
    if (this.state.reviewlist.length > 1) {
      return(
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemText>{this.state.rating}</ListGroupItemText>
            <ListGroupItemText>{this.state.reviewcomment}</ListGroupItemText>
            <ListGroupItemText>{this.state.datereviewed}</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      ) 
    }
    else {
      return(
        <h1>This seller has no reviews!</h1>
      )
    }
  }
};