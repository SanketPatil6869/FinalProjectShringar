import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Images/Logo.JPG"


const Container = styled.div`
  height: 60px;
  background: #83a4d4;
  background: -webkit-linear-gradient(to right, #b6fbff, #83a4d4);
  background: linear-gradient(to right, #b6fbff, #83a4d4);
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Input = styled.input`
  border: none;
  text-align: center;
`;
const AdminNavbar = () => {
    let navigate = useNavigate();

    const [searchValue, setsearchValue] = useState();

    let handlechange = (e) => {
        setsearchValue(e.target.value);
    };

    //   let propic = JSON.parse(sessionStorage.getItem("userProPic"));
    //   if (propic == null) {
    //     propic = "defalutUserImg.png";
    //   }

    return (
        <div className="row">
            <Container className="h-100">
                <Wrapper>
                    <div className="col-3">
                        <Left>
                            <img src={logo} alt="Logo" onClick={() => { navigate("/admin/home"); }} style={{ width: 130, height: 65 }}></img>
                            {/* <Logo>
                                <Link
                                    className=""
                                    tag="a"
                                    to="/home"
                                    style={{ textDecoration: "none" }}
                                    action
                                ></Link>
                                Shringar
                            </Logo> */}
                            <Logo onClick={() => { navigate("/admin/home"); }}>Shringar</Logo>
                        </Left>
                    </div>

                    <div className="col-4 row d-flex justify-content-center align-content-center">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <MenuItem></MenuItem>
                        </div>
                        <div className="col-2">
                            {/* <Avatar src="../Images/arrow.png" /> */}
                            {/* <Avatar alt="" src={require("../User-ProfilePics/" + propic)} /> */}
                        </div>
                        <div className="col-2">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary-light"
                                    id="dropdown-basic"
                                ></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/admin/add-product");
                                        }}
                                    >
                                        Add Product
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/admin/all-Products");
                                        }}
                                    >
                                        Edit Inventory
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/admin/allusers");
                                        }}
                                    >
                                        Users List
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            sessionStorage.removeItem("UserId");
                                            sessionStorage.removeItem("RoleId");
                                            sessionStorage.removeItem("Token");
                                            navigate("/");
                                        }}
                                    >
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </div>
    );
};
export default AdminNavbar;
