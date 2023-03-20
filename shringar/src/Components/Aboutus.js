import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react";
import { Card } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";




export function Aboutus() {
    return (
        <>
            <Navbar></Navbar>
            <div
                className="alert-warning fs-1 fw-bold d-flex justify-content-center align-items-center"
                style={{ height: "20vh" }}
            >
                About us
            </div>

            <div className="bg-white" style={{ height: "30vh" }}>
                <h3 className="text-center fw-bold mt-5 ">Who We Are</h3>
                <p>
                    We are "Shringar" an online jewellery shop. We provide extensive range of product with excellent quality.

                    Our vision is to provide a reliable brand through which customers can order great range of products and also
                    try them virtually through our unique feature of virtual try on.
                </p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={require("../Team/Prasad.jpeg")} />
                            <Card.Body>
                                <Card.Title>Prasad</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-3">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={require("../Team/Sanket.jpeg")} />
                            <Card.Body>
                                <Card.Title>Sanket</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={require("../Team/Pranav.jpeg")} />
                            <Card.Body>
                                <Card.Title>Pranav</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src={require("../Team/Basant.jpeg")}
                                style={{ height: "47.6vh" }}
                            />
                            <Card.Body>
                                <Card.Title>Basant</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card className="mb-5" style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src={require("../Team/Shahzeb.jpeg")}
                                style={{ height: "40vh" }}
                            />
                            <Card.Body>
                                <Card.Title>Shahzeb</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>


                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
//export default Aboutus;