import React from "react";
import { Formik } from "formik";
import style from "./form.module.css";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/actionsProducts";
import { Box, Button, TextField } from "@mui/material";

const Form = () => {
    const lettersOrSpacesREGEX = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    // const imageURLREGEX = /\.(jpeg|jpg|gif|png)$/i;
    const imageURLREGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const numberREGEX = /^([0-9]+(?:\.[0-9]*)?)$/;

    const dispatch = useDispatch();

    return (
        <div className={style}>
            <div className={style.formBack}>
                <h1 className={style.title}>Create New Product</h1>
                <Formik
                    initialValues={{
                        name: "",
                        image: "",
                        description: "",
                        price: "",
                        type: "",
                        category: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        // NAME //
                        if (!values.name) {
                            errors.name = "Please insert product name.";
                        }
                        if (
                            !lettersOrSpacesREGEX.test(values.name) &&
                            values.name
                        ) {
                            errors.name =
                                'Just "," , "." , letters and blank spaces.';
                        }

                        // IMAGE //
                        if (!values.image) {
                            errors.image = "Image URL can't be empty.";
                        }
                        if (values.image && !imageURLREGEX.test(values.image)) {
                            errors.image = "URL not valid.";
                        }

                        // DESCRIPTION //
                        if (!values.description) {
                            errors.description =
                                "Please insert product description.";
                        }
                        if (values.description.length > 200) {
                            errors.description =
                                "Description should be less than 200 characters.";
                        }

                        // PRICE //
                        if (!values.price) {
                            errors.price = "Please insert product price.";
                        }
                        if (values.price && !numberREGEX.test(values.price)) {
                            errors.price = "Just numbers.";
                        }

                        // TYPE //
                        if (!values.type) {
                            errors.type = "Please insert product type.";
                        }

                        // CATEGORY //
                        if (!values.category) {
                            errors.category = "Please insert product category.";
                        }

                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        let {
                            name,
                            image,
                            description,
                            price,
                            type,
                            category,
                        } = values;
                        dispatch(
                            createProduct({
                                name,
                                image,
                                description,
                                price,
                                type,
                                category,
                            })
                        );

                        resetForm();
                        console.log(values);
                    }}
                >
                    {({
                        handleSubmit,
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                        resetForm,
                    }) => (
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.formContainer}>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            "& .MuiTextField-root": {
                                                m: 1,
                                                width: "25ch",
                                            },
                                        }}
                                        color="success"
                                        id="name"
                                        name="name"
                                        label="Name:"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                    />
                                </div>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        id="image"
                                        color="success"
                                        name="image"
                                        label="Image:"
                                        value={values.image}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.image && !!errors.image}
                                        helperText={
                                            touched.image && errors.image
                                        }
                                    />
                                </div>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        color="success"
                                        name="description"
                                        label="Description:"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.description &&
                                            !!errors.description
                                        }
                                        helperText={
                                            touched.description &&
                                            errors.description
                                        }
                                    />
                                </div>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        color="success"
                                        id="price"
                                        name="price"
                                        label="Price:"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.price && !!errors.price}
                                        helperText={
                                            touched.price && errors.price
                                        }
                                    />
                                </div>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        color="success"
                                        id="type"
                                        name="type"
                                        label="Type:"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.type && !!errors.type}
                                        helperText={touched.type && errors.type}
                                    />
                                </div>
                                <div className={style.content}>
                                    <TextField
                                        fullWidth
                                        color="success"
                                        id="category"
                                        name="category"
                                        label="Category:"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.category &&
                                            !!errors.category
                                        }
                                        helperText={
                                            touched.category && errors.category
                                        }
                                    />
                                </div>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    );
};

export default Form;
