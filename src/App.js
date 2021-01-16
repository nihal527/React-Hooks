import React, { Component } from "react";
import CatagoryList from "./CatagoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import "alertifyjs/build/css/alertify.css";
import { Switch, Route } from "react-router-dom";

import alertify from "alertifyjs";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo from "./FormDemo";
import FormDemo2 from "./FormDemo2";
export default class App extends Component {
  state = {
    currentCatagory: "",
    cart: [],
    products: [],
  };
  changeCatagory = (value) => {
    this.setState({
      currentCatagory: value.categoryName,
    });
    this.getProducts(value.id);
  };
  componentDidMount() {
    this.getProducts();
  }
  getProducts = (id) => {
    let url = "http://localhost:3000/products";
    if (id) {
      url += "?categoryId=" + id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return this.setState({ products: data });
      });
  };
  addToCard = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((cart) => cart.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " add to cart", 2);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " remove from cart", 2);
  };
  // {...props} = Propsların kopyasını al onu gönder
  render() {
    let title = "Naviii";
    let productInfo = { title: "Ürünler" };
    let catagoryInfo = { title: "Katagoriler" };

    return (
      <div>
        <Container>
          <Navi
            removeFromCart={this.removeFromCart}
            title={title}
            cart={this.state.cart}
          ></Navi>

          <Row>
            <Col xs="3">
              <CatagoryList
                change={this.changeCatagory}
                info={catagoryInfo}
                currentCatagory={this.state.currentCatagory}
              ></CatagoryList>
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      currentCatagory={this.state.currentCatagory}
                      products={this.state.products}
                      info={productInfo}
                      addToCard={this.addToCard}
                    ></ProductList>
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    ></CartList>
                  )}
                />
                <Route path="/form1" component={FormDemo} />
                <Route path="/form2" component={FormDemo2} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
