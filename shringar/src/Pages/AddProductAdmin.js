import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAddProduct } from "../Components/AdminAddProduct";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import { fetchUserData } from "../Service/UserService";


export const AddProductAdmin = () => {


    let navigate = useNavigate();
    useEffect(() => {

        let userRole = JSON.parse(sessionStorage.getItem("RoleId"));
        let token = (sessionStorage.getItem("Token"));

        if (token == null) {
            navigate("/login");
        }
        if (userRole == 1) {
            navigate("/login");
        }
    }, []);



    return (
        <>
            <AdminNavbar></AdminNavbar>
            <AdminAddProduct></AdminAddProduct>
            <Footer></Footer>
        </>
    );
}