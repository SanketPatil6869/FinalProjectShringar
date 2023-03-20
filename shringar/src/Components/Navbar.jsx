//import { ShoppingCart } from "@material-ui/icons";
//import { ShoppingBasketOutlined } from '@material-ui/icons';
import { Badge } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Images/Logo.JPG"
//import { SearchOutlinedIcon } from '@mui/icons-material/SearchOutlined';
//import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';


const Container = styled.div`
    height:60px;
    background-color: #fff7f7;
    
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align: items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

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

const Input = styled.input`
  border: none;
  
`;

const Logo = styled.h1`
  font-weight: bold;
 
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

`;

const Navbar = () => {

    let navigate = useNavigate();

    const [itemsQuantity, setitemsQuantity] = useState();

    const getCartQuantity = async () => {
        let res = await axios.get(
            "http://localhost:8080/getCartQuantity/" +
            JSON.parse(sessionStorage.getItem("CartId"))
        );
        if (res.data.status == "success") {
            console.log(res.data.quantity);
            setitemsQuantity(res.data.quantity);
        }
        console.log(res.data);
    }

    useEffect(() => {
        getCartQuantity();
    }, [])

    const handleCart = () => {
        let to = sessionStorage.getItem("Token");
        if (to == null) {
            navigate("/login");
        }
        else {
            navigate("/cart");
        }
    }


    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>

                        <img src={logo} alt="Logo" onClick={() => { navigate("/"); }} style={{ width: 130, height: 65 }}></img>
                        {/* <SearchContainer>
                            <Input placeholder="Serach"></Input>
                      
                            <i class="fa-solid fa-magnifying-glass"></i>
             
                       </SearchContainer> */}
                    </Left>
                    <Center>
                        <Logo onClick={() => { navigate("/"); }}>Shringar</Logo>
                    </Center>
                    <Right>

                        <MenuItem>
                            {/* <i class="fa-regular fa-cart-shopping"></i> */}
                            <Badge badgeContent={itemsQuantity} color="primary">
                                <div
                                    onClick={handleCart}
                                >Cart</div>
                            </Badge>
                        </MenuItem>
                        <div className="col-2">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary-light"
                                    id="dropdown-basic"
                                ></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/user-profile");
                                        }}
                                    >
                                        User Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/your-orders");
                                        }}
                                    >
                                        User Orders
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/Address-Form");
                                        }}
                                    >
                                        Add Address
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate("/aboutUs");
                                        }}
                                    >
                                        About us
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            sessionStorage.removeItem("UserId");
                                            sessionStorage.removeItem("RoleId");
                                            sessionStorage.removeItem("Token");
                                            sessionStorage.removeItem("CartId");
                                            sessionStorage.removeItem("FORGOT");
                                            navigate("/");
                                        }}
                                    >
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <MenuItem><Link to='/Register'> Register</Link></MenuItem>
                        <MenuItem><Link to='/login'> Log IN </Link></MenuItem>
                        <MenuItem>

                        </MenuItem>
                    </Right>
                </Wrapper>
            </Container>
        </div>
    );
};

export default Navbar;