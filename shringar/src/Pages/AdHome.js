import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import Displaycard from "../Components/Displaycard";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";



export const AdHome = () => {

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
            <Slider></Slider>
            <Displaycard></Displaycard>
            <Footer></Footer>
        </>
    );
}