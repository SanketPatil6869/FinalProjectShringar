import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const ForgotPassword = () => {

    let navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        sessionStorage.setItem("FORGOT", JSON.stringify(values));
        let res;
        if ((res = (await axios.get("http://localhost:8080/send-OTP/" + values.email))
            .data)) {
            console.log(res);
            navigate("/forgot-otp-box");
        } else
            Swal.fire(
                "Enter Valid Details",
                "Error"
            );
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <>
            <>
                <form onSubmit={handleSubmit}>
                    <div className="card col-5 mx-auto mt-4 mb-4" style={{ width: 300 }}>
                        <div className="card-header text-center h5 text-white bg-primary">Password Reset</div>
                        <div className="card-body px-5">
                            <p className="card-text py-2">
                                Enter your email address and we'll send you an email with instructions to
                                reset your password.
                            </p>
                            <div className="form-outline">
                                <label className="form-label fs-6 " htmlFor="typeEmail">
                                    Email input
                                </label>
                                <input type="email" id="typeEmail" name="email" className="form-control my-3" onChange={onChange} />

                                <label className="form-label fs-6 " htmlFor="typeEmail">
                                    Enter New Password
                                </label>
                                <input type="email" id="typeEmail" name="password" className="form-control my-3" onChange={onChange} />

                                <label className="form-label fs-6 " htmlFor="typeEmail">
                                    Confirm Password
                                </label>
                                <input type="email" id="typeEmail" className="form-control my-3" />
                            </div>
                            <Button type="submit" className="btn btn-primary w-100" >
                                Reset password
                            </Button>
                            <div className="d-flex justify-content-between mt-4">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </>

        </>
    );
}