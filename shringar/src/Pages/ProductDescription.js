import React, { useEffect } from "react";
import Displaycard from "../Components/Displaycard";
import Navbar from "../Components/Navbar";
import OneProduct from "../Components/OneProduct";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function ProductDescription() {

  let navigate = useNavigate();
  useEffect(() => {
    //  let userPresent = JSON.parse(sessionStorage.getItem("UserId"));
    //  let userRole = JSON.parse(sessionStorage.getItem("RoleId"));
    let token = (sessionStorage.getItem("Token"));

    if (token == null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <OneProduct></OneProduct>
      <Displaycard></Displaycard>
      <Footer></Footer>

    </div>
  );
}
