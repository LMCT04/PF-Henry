import style from "./register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import { Button, TextField, } from "@mui/material";

const Register = () => {
    const [message, setMessage] = useState("");

    const users = [
        {
            username: "pepito",
            password: "pepito1234",
        },
        {
            username: "pablito",
            password: "pablito1234",
        },
        {
            username: "carmen",
            password: "carmen1234",
        },
        {
            username: "juana",
            password: "juana1234",
        },
        {
            username: "miguel",
            password: "miguel1234",
        },
    ];

    return (
        <div className={style.landing}>
            <div className={style.contentContainer}>
                <p className={style.p1}>
                    Welcome to our coffee shop for celiacs! Enjoy the
                    irresistible flavors from the comfort of your home. Enter
                    and discover the pleasure of each sip and bite with just one
                    click. Your perfect cup of coffee awaits you in our online
                    store!
                </p>
                <div className={style.imgContainer}></div>
            </div>
            <div className={style.formContainer}>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        email: "",
                        address: "",
                    }}
                    validate={(valores) => {
                        let errores = {};

                        //Validacion Username
                        if (!valores.username) {
                            errores.username = "Por favor ingrese su usuario";
                        } else if (
                            !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)
                        ) {
                            errores.username =
                                "Solo debe ingresar letras y espacios";
                        }

                        //Validacion Password
                        if (!valores.password) {
                            errores.password =
                                "Por favor ingresar una contraseña";
                        }

                        //Validaciones Email
                        if (!valores.email) {
                            errores.email = "Por favor ingrese un correo";
                        } else if (
                            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                                valores.email
                            )
                        ) {
                            valores.email = "Ingrese un correo valido";
                        }

                        //Validaciones Address
                        if (!valores.address) {
                            errores.address = "Por favor ingrese una direccion";
                        }

                        return errores;
                    }}
                    onSubmit={(valores, { resetForm }) => {
                        resetForm();
                        console.log("comprobar usuario");
                        console.log(valores);

                        const foundUser = users.find(
                            (user) =>
                                user.username === valores.username &&
                                user.password === valores.password &&
                                user.email === valores.email &&
                                user.address === valores.address
                        );
                        if (foundUser) {
                            setMessage("El usuario ya exsite");
                        } else {
                            users.push({
                                username: valores.username,
                                password: valores.password,
                                email: valores.email,
                                address: valores.address,
                            });
                            setMessage(
                                "Su usuario ah sido creado exitosamente"
                            );
                        }
                    }}
                >
                    {({
                        handleSubmit,
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                    }) => (
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.content}>
                                <TextField
                                    autoComplete="off"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    color="success"
                                    type="text"
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.username && !!errors.username
                                    }
                                    helperText={
                                        touched.username && errors.username
                                    }
                                />
                            </div>
                            <div className={style.content}>
                                <TextField
                                    autoComplete="off"
                                    InputProps={{
                                        style: {
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    color="success"
                                    type="password"
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.password && !!errors.password
                                    }
                                    helperText={
                                        touched.password && errors.password
                                    }
                                />
                            </div>
                            <div className={style.content}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    color="success"
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </div>
                            <div className={style.content}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    color="success"
                                    type="text"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.address && !!errors.address}
                                    helperText={
                                        touched.address && errors.address
                                    }
                                />
                            </div>
                            <div className={style.buttonContainer}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    CREATE ACCOUNT
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
                {message && <p>{message}</p>}
                <Link to="/login" className={style.link}>
                    Are you already registered?
                </Link>
                <p>©2023 CeliacTeam. All rights reserved</p>
            </div>
        </div>
    );
};

export default Register;
