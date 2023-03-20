import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import { AdProductDataTable } from "../Components/AdProductDataTable";
import Footer from "../Components/Footer";
import { fetchUserData } from "../Service/UserService";



export const AdminProductDataTable = () => {

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
            <AdProductDataTable></AdProductDataTable>
            <Footer></Footer>
        </>
    );
} 