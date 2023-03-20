import { Box, CardActions, CardContent } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

{/* <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
>
    •
</Box> */}

export const OTPBox = () => {
    let navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    let navigatetoLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <div
                className="container-fluid "
                style={{ background: "linear-gradient(to right, #b6fbff, #83a4d4)" }}
            >
                <div className="row justify-content-center align-content-center hei">
                    <div className="col-8 text-center">
                        <Card className="" sx={{ minWidth: 275 }}>
                            <h3>Shringar</h3>
                            <h1>Verify its you</h1>
                            <p>
                                To make sure your account is Safe Shringar want's <br />
                                to make sure its you
                            </p>
                            <CardContent>
                                {" "}
                                {otp.map((data, index) => {
                                    return (
                                        <input
                                            className="otp-field"
                                            type="text"
                                            name="otp"
                                            maxLength="1"
                                            key={index}
                                            value={data}
                                            onChange={(e) => handleChange(e.target, index)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    );
                                })}
                                <p>OTP Entered - {otp.join("")}</p>
                                <p>
                                    <button
                                        className="btn btn-secondary mr-2"
                                        onClick={(e) => setOtp([...otp.map((v) => "")])}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={async (e) => {
                                            if (otp.join("") > 10000) {
                                                let url = "http://localhost:8080/verify-OTP";

                                                let body = {
                                                    otp: otp.join(""),
                                                    email: JSON.parse(sessionStorage.getItem("USER"))
                                                        .email,
                                                };
                                                console.log(otp);
                                                let status = await axios.post(url, body);
                                                console.log(status);
                                                if (status.data) {
                                                    if (
                                                        (
                                                            await axios.post(
                                                                "http://localhost:8080/register",
                                                                JSON.parse(sessionStorage.getItem("USER"))
                                                            )
                                                        ).data
                                                    ) {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "Succefuly Registred :)",
                                                            text: "Enjoy Shopping",
                                                        });

                                                        navigatetoLogin();
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Wrong OTP",
                                                            text: "Enter a valid OTP!! You will get it on your email.",
                                                        });
                                                    }
                                                }
                                                else {
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "Are you hacker? :)",
                                                        text: "Enter a valid OTP!! You will get it on your email.",
                                                    });
                                                }
                                            }
                                        }}
                                    >
                                        Verify OTP
                                    </button>
                                </p>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                    size="small"
                                >
                                    Go back
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}