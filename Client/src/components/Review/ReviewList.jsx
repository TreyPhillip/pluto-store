import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container } from 'reactstrap'

export default class Reviewlist extends Component {
  constructor(props) {
		super(props);
		this.state = {
            reviewlist: [],
            numberrating: this.props.numberrating,
            reviewcomment: this.props.reviewcomment,
            datereviewed: this.props.datereviewed
    };
  }
  render() {
      return(
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemText>Rating: {this.state.numberrating}/5</ListGroupItemText>
            <ListGroupItemText>Comment: {this.state.reviewcomment}</ListGroupItemText>
            <ListGroupItemText>Date Reviewed: {this.state.datereviewed}</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      ); 
    }
};