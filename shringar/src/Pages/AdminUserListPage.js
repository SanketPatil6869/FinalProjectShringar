import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import { AdminUserList } from "../Components/AdminUserList";
import Footer from "../Components/Footer";
import { fetchUserData } from "../Service/UserService";


export const AdminUserListPage = () => {

    let navigate = useNavigate();
    useEffect(() => {
        //   let userPresent = JSON.parse(sessionStorage.getItem("UserId"));
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
            <AdminUserList></AdminUserList>
            <Footer></Footer>
        </>
    );
}