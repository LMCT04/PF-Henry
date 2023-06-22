import style from "./login.module.css";
//import { Link } from 'react-router-dom'
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState("");

    const handleRegister = () => {
        history.push("/register");
    };

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
        {
            username: "adminJulian",
            password: "password98",
        },
    ];

    return (
        <div className={style.loginContainer}>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validate={(valores) => {
                    let errores = {};

                    //Validacion Username
                    if (!valores.username) {
                        errores.username = "Please enter your username";
                    } else if (
                        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)
                    ) {
                        errores.username =
                            "You only need to enter letters and spaces";
                    }

                    //Validacion Password
                    if (!valores.password) {
                        errores.password = "Please enter your password";
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
                            user.password === valores.password
                    );
                    if (foundUser) {
                        history.push("/menu");
                    } else {
                        setError("The user entered does not exist");
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
                    <form onSubmit={handleSubmit} className={style.form}>
                        <section className={style.content}>
                            <h1>Sign in:</h1>
                            <div>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
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
                                    color="success"
                                />
                            </div>
                            <div>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
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
                                    color="success"
                                />
                            </div>
                            <div>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                >
                                    Login
                                </Button>
                            </div>
                            <Link to="/register" className={style.link}>
                                Don't have an account?
                            </Link>
                        </section>
                    </form>
                )}
            </Formik>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
