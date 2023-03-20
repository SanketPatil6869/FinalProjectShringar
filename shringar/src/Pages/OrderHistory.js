import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Cards";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
const OrderHistory = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let userPresent = JSON.parse(sessionStorage.getItem("UserId"));
    let userRole = JSON.parse(sessionStorage.getItem("RoleId"));
    let token = (sessionStorage.getItem("Token"));

    if (token == null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Card></Card>
      <Footer></Footer>
    </div>
  );
};

export default OrderHistory;
