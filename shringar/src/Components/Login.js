import axios from "axios";
import { useState } from "react";
import "../Stylesheets/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import FormInput from "./FormInput";
import { fetchUserData } from "../Service/UserService";
import Navbar from "./Navbar";
import Footer from "./Footer";


export const Login = () => {

    let navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    const validationcheck = () => {
        if (
            values.firstName == "" ||
            values.lastName == "" ||
            values.email == "" ||
            values.mobile == "" ||
            values.password == "" ||
            values.confirmPassword == ""
        ) {
            Swal.fire("Enter all feilds", "Please fill details and proceed", "error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8080/login";
        let user;
        let pass = (values.password);
        // console.log(pass);
        let body = {
            email: values.email,
            password: pass,
        };
        try {

            user = await axios.post(url, body);
        } catch (e) {
            Swal.fire(
                "Enter valid details",
                "Create an account if you have not created!!",
                "error"
            );
        }
        if (user != null) {
            sessionStorage.setItem("Token", user.data.token);
            console.log("Token " + user.data.token)
            let uid = sessionStorage.setItem("UserId", JSON.stringify(user.data.userId));
            let role = user.data.role.roleId;
            sessionStorage.setItem("RoleId", JSON.stringify(role));
            console.log(role);


            if (role == 1) {
                let res = (
                    await axios.get(
                        "http://localhost:8080/get-userCart/" + user.data.userId
                    )
                ).data;
                //    sessionStorage.setItem("Token", res.data.token);
                sessionStorage.setItem("CartId", JSON.stringify(res));

                navigate("/");
            } if (role == 0) {
                navigate("/admin/home");
            }


        }
    };
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };



    return (
        <>
            <Navbar></Navbar>
            <div className="appl my-0">
                <form className="forml" onSubmit={handleSubmit}>
                    <h1 className="logh1">Login</h1>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button className="logbutton" onClick={validationcheck}>
                        Login
                    </button>
                    <p className="my-0 w-100 text-center">
                        New User? <Link to="/register"> Create an account</Link>
                    </p>
                    <p className="my-0 w-100 text-center mt-1">
                        <Link to="/forgot-password"> Forgot Password</Link>
                    </p>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
}
