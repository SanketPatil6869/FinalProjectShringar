import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../Components/Cart";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";




export default function CartPage() {

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
      <div className="cartBody carthtml">
        <Cart></Cart>
      </div>
      <Footer></Footer>
    </div>
  );
}
