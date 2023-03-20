import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Stylesheets/AdminAdd.css";

export const AdminUpdateProduct = () => {

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

    const product = JSON.parse(sessionStorage.getItem("UpdateProduct"));

    const [productName, setproductName] = useState(product.name);
    const [productprice, setproductprice] = useState(product.price);
    const [productquantity, setproductquantity] = useState(product.quantity);

    const [productcategory, setproductcategory] = useState(product.category);
    const [gender, setgender] = useState(product.gender);
    const [productmetal, setproductmetal] = useState(product.metal);
    const [productbrand, setproductbrand] = useState(product.brand);
    const [productId, setProductId] = useState(product.productId);
    const [productDescriptiion, setproductDescriptiion] = useState(product.description);
    const [selectedFile, setSelectedFile] = useState(null);

    const changeproductName = (event) => {
        setproductName(event.target.value);
    };

    const changeproductDescription = (e) => {
        setproductDescriptiion(e.target.value);
    };

    const changeproductprice = (event) => {
        setproductprice(event.target.value);
    };

    const changeproductquantity = (event) => {
        setproductquantity(event.target.value);
    };

    const changeproductcategory = (event) => {
        setproductcategory(event.target.value);
    };

    const changegender = (event) => {
        setgender(event.target.value);
    };
    const changeproductmetal = (event) => {
        setproductmetal(event.target.value);
    };
    const changeproductbrand = (event) => {
        setproductbrand(event.target.value);
    };
    const transferValue = async (e) => {
        e.preventDefault();
        console.log(productName);
        if (
            productName == "" ||
            productprice == "" ||
            productquantity == "" ||
            productcategory == "" ||
            gender == "" ||
            productmetal == "" ||
            productbrand == ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Try again",
            });
        } else {
            let productDto = new FormData();

            productDto.append("Name", productName);
            productDto.append("price", productprice);
            productDto.append("quantity", productquantity);
            productDto.append("Description", productDescriptiion);
            productDto.append("category", productcategory);
            productDto.append("metal", productmetal);
            productDto.append("brand", productbrand);
            productDto.append("gender", gender);
            productDto.append("id", productId);
            productDto.append("productImg", selectedFile);
            let status;
            try {
                status = await axios.post(
                    "http://localhost:8080/update-product",
                    productDto
                );
            } catch (e) {
                status = false;
            }

            if (status) {
                Swal.fire({
                    icon: "success",
                    title: "product Updated!!!",
                    text: "You have been successfully added product",
                });
                navigate("/admin/all-products");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Try again",
                    text: "product Not Added!!!",
                });
            }
        }
        setproductName("");
        setproductprice("");
        setproductDescriptiion("");
        setproductcategory("");
        setproductquantity("");
        setproductmetal("");
        setproductbrand("");
    };
    let getfile = (e) => {
        console.log(e.target.value);
        setSelectedFile(e.target.files[0]);
    };


    return (
        <>
            <div class="container justify-content-center f1">
                <div class="card " style={{ width: "80vw" }}>
                    <div class="card-body">
                        <div
                            className="container  height-100 p-5 rounded"
                            style={{
                                width: "80vw",
                                backgroundColor: "rgba(0,0,255,0.1)",
                            }}
                        >
                            <div className="row mb-5">
                                <div
                                    className="col   fs-2 text-center"
                                    style={{ color: "blue" }}
                                >
                                    Add Admin products
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div className="col-6">
                                    <form onSubmit={transferValue} id="productForm">
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Product name:</label>
                                            <input
                                                type="text"
                                                id="pname"
                                                name="pname"
                                                placeholder="Enter product name"
                                                required
                                                value={productName}
                                                onChange={changeproductName}
                                            ></input>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Product Description:</label>
                                            {/* <input
                                                type="textarea"
                                                id="pname"
                                                name="pname"
                                                placeholder="Enter product name"
                                                required
                                                value={productName}
                                                onChange={changeproductName}
                                                ></input> */}
                                            <textarea
                                                rows="4"
                                                cols="25"
                                                name="comment"
                                                form="productForm"
                                                onChange={changeproductDescription}
                                                value={productDescriptiion}
                                                placeholder="Enter Product Description..."
                                            ></textarea>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Product Metal:</label>
                                            <input
                                                type="text"
                                                id="pmetal"
                                                name="pmetal"
                                                placeholder="Enter product Metal"
                                                required
                                                value={productmetal}
                                                onChange={changeproductmetal}
                                            ></input>
                                        </div>

                                        <br />
                                        <br />
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Product price:</label>
                                            <input
                                                type="number"
                                                id="pname"
                                                name="pname"
                                                placeholder="Enter product price"
                                                required
                                                value={productprice}
                                                onChange={changeproductprice}
                                            ></input>
                                        </div>

                                        <br />

                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Product Quantity:</label>
                                            <input
                                                type="number"
                                                id="pquantity"
                                                name="pquantity"
                                                placeholder="Enter product Quantity"
                                                required
                                                value={productquantity}
                                                onChange={changeproductquantity}
                                            ></input>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pname">Gender:</label>
                                            <div className="d-flex" onChange={changegender}>
                                                <div className="form-check me-4">
                                                    <input
                                                        className="form-check-input "
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        value="Male"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                        for="flexRadioDefault1"
                                                    >
                                                        Male
                                                    </label>
                                                </div>
                                                <br />
                                                <div className="form-check">
                                                    <input
                                                        class="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        value="Female"
                                                    ></input>
                                                    <label
                                                        className="form-check-label"
                                                        for="flexRadioDefault2"
                                                    >
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-evenly">
                                            <label for="pcategory">Product category:</label>
                                            <select
                                                className="form-select"
                                                style={{ width: "200px" }}
                                                value={productcategory}
                                                onChange={changeproductcategory}
                                            >
                                                <option selected>Categories</option>
                                                <option value="Chain">Chain</option>
                                                <option value="Necklace">Necklace</option>
                                                <option value="Earrings">Earrings</option>
                                                <option value="Pendants">Pendants</option>
                                                <option value="Bracelets">Bracelets</option>
                                                <option value="Ring">Ring</option>
                                                <option value="Bangles">Bangles</option>

                                            </select>
                                        </div>
                                        <br />

                                        <div className="d-flex justify-content-center">
                                            <label for="pname">Product Brand:</label>
                                            <input
                                                type="text"
                                                id="pbrand"
                                                name="pbrand"
                                                placeholder="Enter product brand"
                                                required
                                                value={productbrand}
                                                onChange={changeproductbrand}
                                            ></input>
                                        </div>
                                        <br />
                                        <div className="d-flex justify-content-between mb-5">
                                            <label for="filename">Product image : </label>
                                            <input
                                                type="file"
                                                id="productfile"
                                                name="filename"
                                                onChange={getfile}
                                            ></input>
                                        </div>
                                        <br />
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="btn btn-primary text-center"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}