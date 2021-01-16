import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CatagoryList extends Component {
  state = {
    catagories: [],
  };
  componentDidMount() {
    this.getCategories();
  }
  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        return this.setState({ catagories: data });
      });
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.catagories.map((a) => {
            return (
              <ListGroupItem
                active={a.categoryName === this.props.currentCatagory}
                key={a.id}
                onClick={() => this.props.change(a)}
              >
                {a.categoryName}
              </ListGroupItem>
            );
          })}
        </ListGroup>
        {/* <h4>{this.props.currentCatagory}</h4> */}
      </div>
    );
  }
}
