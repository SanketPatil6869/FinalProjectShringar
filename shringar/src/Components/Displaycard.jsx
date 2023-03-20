import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Displaycard() {
  const [productList, setproductList] = useState([]);

  let navigate = useNavigate();

  let AddProductToCart = async (e) => {



    let url = "http://localhost:8080/add-product-cart";
    let body = {
      productid: e.target.id,
      quantity: 1,
      userid: JSON.parse(sessionStorage.getItem("UserId")),
      metal: "Gold",
      size: "L",
      status: "Pending",
    };

    try {
      let res = await axios.post(url, body);
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart :)",
          text: "You can buy item from cart",
        });
        navigate("/cart");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Login First / Product is already added",
        text: "Try again!! Product is not added :(",

      });
    }
  };

  let getAllProducts = async () => {
    let res = await axios.get("http://localhost:8080/all-products", {});
    setproductList(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className="mx-5 my-4">
      <div className="alert alert-secondary">
        <Row xs={1} md={2} className="g-4 m-0 p-0">
          {productList.map((item, index) => (
            <Col className="col col-md-3 my-3">
              <Card className="h-100 w-100">
                <Card.Img
                  style={{ width: 320, height: 300 }}
                  variant="top"
                  className="m-0 "
                  src={
                    item.productImg.startsWith("images")
                      ? "http://" + item.productImg
                      : require("../Product-Images/" + item.productImg)
                  }
                  alt={item.category}
                />
                <Card.Body>
                  <Card.Title className="text-center fw-bold">
                    {item.brand}
                  </Card.Title>
                  <Card.Text className="text-center">
                    {item.name}
                    <div className="fw-bold text-danger">
                      {"₹ " + item.price}
                    </div>
                  </Card.Text>
                  <div className="d-flex justify-content-evenly">
                    <Button
                      className="btn"
                      id={item.productId}
                      onClick={AddProductToCart}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className="btn"
                      onClick={() => {
                        sessionStorage.setItem(
                          "productId",
                          JSON.stringify(item)
                        );
                        navigate("/product");

                        window.location.reload();
                      }}
                    >
                      View details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Displaycard;
