import React from "react";
import { Formik } from "formik";
import style from "./form.module.css";
import Footer from "../../Components/Footer/Footer";

const CreateForm = () => {
    const lettersOrSpacesREGEX = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    // const imageURLREGEX = /\.(jpeg|jpg|gif|png)$/i;
    const imageURLREGEX = /^data:image\/jpeg;base64,[a-zA-Z0-9+/=]+$/;

    const numberREGEX = /^([0-9]+(?:\.[0-9]*)?)$/;

    return (
        <div className={style.formBack}>
            <h1>Create New Product</h1>
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
                            <div>
                                {/* <label htmlFor="name">Nombre:</label> */}
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name:"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.name && errors.name && (
                                    <p>{errors.name}</p>
                                )}
                            </div>
                            <div>
                                {/* <label htmlFor="image">Image:</label> */}
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    placeholder="Image URL:"
                                    value={values.image}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.image && errors.image && (
                                    <p>{errors.image}</p>
                                )}
                            </div>
                            <div>
                                {/* <label htmlFor="description">
                                    Descripción:
                                </label> */}
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Description:"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.description && errors.description && (
                                    <p>{errors.description}</p>
                                )}
                            </div>
                            <div>
                                {/* <label htmlFor="price">Precio:</label> */}
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    placeholder="Price:"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.price && errors.price && (
                                    <p>{errors.price}</p>
                                )}
                            </div>
                            <div>
                                {/* <label htmlFor="type">Tipo:</label> */}
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    placeholder="Type:"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.type && errors.type && (
                                    <p>{errors.type}</p>
                                )}
                            </div>
                            <div>
                                {/* <label htmlFor="category">Categoría:</label> */}
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    placeholder="Category:"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.category && errors.category && (
                                    <p>{errors.category}</p>
                                )}
                            </div>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                )}
            </Formik>
            <Footer/>
        </div>
    );
};

export default CreateForm;
