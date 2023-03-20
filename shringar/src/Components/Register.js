import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import Footer from "./Footer";
import Navbar from "./Navbar";
//import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    // url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    url("https://stock.adobe.com/images/designer-wedding-rings-on-a-sparkling-background/178079650")  
      center;
  background-image: ../Images/RegisterBackground.jpg;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    mobile: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    sessionStorage.setItem("USER", JSON.stringify(values));
    let res;
    if ((res = (await axios.get("http://localhost:8080/send-OTP/" + values.email))
      .data)) {
      console.log(res);
      navigate("/otp-box")
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
      <Navbar></Navbar>
      <Container >
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input name="first_name" placeholder="name" onChange={onChange} pattern="[A-Za-z]{2,25}" required />
            <Input name="last_name" placeholder="last name" onChange={onChange} pattern="[A-Za-z]{3,25}" required />
            <Input name="mobile" placeholder="mobile" onChange={onChange} pattern="[6-9]{1}[0-9]{9}" required />
            <Input name="email" placeholder="email" onChange={onChange} pattern="[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)]]" required />
            <Input name="password" type="password" placeholder="password" onChange={onChange} required />
            <Input name="confirm_password" type="password" placeholder="confirm password" onChange={onChange} required />
            <p className="my-0 w-100 text-center mt-3">
              Already Have An Account <Link to="/login"> Log In</Link>
            </p>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Register;