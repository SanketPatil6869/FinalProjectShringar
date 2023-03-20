import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "../Components/AddressForm";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { fetchUserData } from "../Service/UserService";


export const AddressPage = () => {

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
        <>
            <Navbar></Navbar>
            <AddressForm></AddressForm>
            <Footer></Footer>
        </>
    );
};