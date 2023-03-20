import { Box, Button, Checkbox, Container, createTheme, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import Swal from "sweetalert2";


const theme = createTheme();

export const AddressForm = () => {

    const [values, setValues] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        zip: "",
        country: "",
        uid: JSON.parse(sessionStorage.getItem("UserId")),
    });

    let [isDefault, setisDefault] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //let isValid = formRef.current.reportValidity();
        console.log(isDefault);
        let body = {
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            state: values.state,
            firstName: values.firstName,
            lastName: values.lastName,
            zip: values.zip,
            country: values.country,
            isDefault: isDefault,
            uid: JSON.parse(sessionStorage.getItem("UserId")),
        };
        console.log(body);
        if (body != null) {
            let res;
            try {
                res = await axios.post("http://localhost:8080/add-User-Address", body);

                if (res.data) {
                    Swal.fire({
                        icon: "info",
                        title: "New address is added",
                        text: "You will recive order on this address",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Address already exists",
                        text: "You will recive order on existing address",
                    });
                }

            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Address is Invalid",
                    text: "Plese Enter a valid address so that we know where to deliver :)",
                });
            }
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    return (
        <>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <form >
                            <Typography component="h1" variant="h4" align="center">
                                Shipping address
                            </Typography>

                            <React.Fragment>
                                <Typography variant="h6" gutterBottom></Typography>
                                <Grid container spacing={3} marginTop={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last name"
                                            fullWidth
                                            autoComplete="family-name"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address1"
                                            name="address1"
                                            label="Address line 1"
                                            fullWidth
                                            autoComplete="shipping address-line1"
                                            variant="standard"
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            label="Address line 2"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="shipping address-level2"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="State/Province/Region"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zip"
                                            name="zip"
                                            label="Zip / Postal code"
                                            fullWidth
                                            autoComplete="shipping postal-code"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="country"
                                            name="country"
                                            label="Country"
                                            fullWidth
                                            autoComplete="shipping country"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    name="isDefault"
                                                    value="true"
                                                    onClick={() => {
                                                        isDefault = isDefault
                                                            ? setisDefault(false)
                                                            : setisDefault(true);
                                                    }}
                                                />
                                            }
                                            label="Use this address for payment details"
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            <React.Fragment>
                                {/* {getStepContent(activeStep)} */}
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="Submit"
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </React.Fragment>
                        </form>
                    </Paper>
                    {/* <Copyright /> */}
                </Container>
            </ThemeProvider>
        </>
    );
};