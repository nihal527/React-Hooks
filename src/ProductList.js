import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.info.title}-{this.props.currentCatagory}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>UnitPrice</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((a) => {
              return (
                <tr key={a.id}>
                  <th scope="row">{a.id}</th>
                  <td>{a.productName}</td>
                  <td>{a.quantityPerUnit}</td>
                  <td>{a.unitPrice}</td>
                  <td>
                    <Button
                      onClick={() => this.props.addToCard(a)}
                      color="info"
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
