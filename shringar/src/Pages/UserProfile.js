import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { ProfilePage } from "../Components/ProfilePage";
import { fetchUserData } from "../Service/UserService";


export const UserProfile = () => {

    const [data, setData] = useState({});

    let navigate = useNavigate();

    // useEffect(() => {
    //     fetchUserData().then((response) => {
    //         setData(response.data);

    //     }).catch((e) => {
    //         console.log("error", e);
    //         //  navigate("/login");
    //     }).catch((e) => {
    //         navigate("/login");
    //     })
    // }, []);

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
            <ProfilePage></ProfilePage>
            <Footer></Footer>
        </>
    );
}