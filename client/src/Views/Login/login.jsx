import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./login.module.css";
import { createUsers, getAllUsers } from "../../redux/actions/actionsUsers";
import { auth } from "../../firebase/config";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const users = useSelector((state) => state.user);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const authInstance = getAuth();
            const result = await signInWithPopup(authInstance, provider);
            const { user } = result;

            // Extraer datos del usuario de Firebase
            const { displayName, email, photoURL } = user;
            const findUser = users.find((user) => user.mail === email);
            if (findUser) {
                window.localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(findUser)
                );
                history.push({
                    pathname: "/menu",
                });
            } else {
                const newUser = {
                    userName: displayName,
                    fullName: displayName,
                    image: photoURL,
                    mail: email,
                    password: "Usuario1234",
                    role: "user",
                };

                await dispatch(createUsers(newUser));

                setLoggedInUser(newUser);
                localStorage.setItem("loggedInUser", JSON.stringify(newUser));
                history.push({
                    pathname: "/registergmail",
                    state: { user: newUser },
                });
            }
        } catch (error) {
            setError("An error occurred during login");
        }
    };

    const handleRegister = async (values) => {
        try {
            const gmailUser = users.find((user) => user.mail === values.email);
            if (gmailUser) {
                alert("An account with this email already exists");
                return;
            }
            const UserNameFind = users.find(
                (user) => user.userName === values.username
            );
            if (UserNameFind) {
                alert("An account with this username already exists");
                return;
            }

            const newUser = {
                userName: values.username,
                fullName: values.username,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMGbo721CsaKbKgnmgF9D5KXg6ULWXOdBZ8Qid9csRQ&s",
                mail: values.email,
                password: values.password,
                address: values.address,
                role: "user",
            };

            await dispatch(createUsers(newUser));
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify(newUser)
            );
            history.push("/menu");
        } catch (error) {
            setError("An error occurred while creating the user");
        }
    };

    return (
        <div className={style.loginContainer}>
            <Formik
                initialValues={{
                    mail: "",
                    password: "",
                }}
                validate={(values) => {
                    let errors = {};

                    // Validación Username
                    if (!values.mail) {
                        errors.username = "Please enter your email";
                    }

                    // Validación Password
                    if (!values.password) {
                        errors.password = "Please enter your password";
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    console.log("comprobar usuario");
                    console.log(values);

                    const foundUser = users.find(
                        (user) =>
                            user.mail === values.mail &&
                            user.password === values.password
                    );
                    if (foundUser) {
                        window.localStorage.setItem(
                            "loggedInUser",
                            JSON.stringify(foundUser)
                        );
                        history.push("/menu");
                    } else {
                        setError("Invalid username or password");
                        alert("Invalid username or password");
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
                }) => {
                    return (
                        <form onSubmit={handleSubmit} className={style.form}>
                            <section className={style.content}>
                                <h1>Sign in:</h1>
                                <div>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        type="text"
                                        id="mail"
                                        name="mail"
                                        label="mail"
                                        value={values.mail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.mail && !!errors.mail}
                                        helperText={touched.mail && errors.mail}
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
                                            touched.password &&
                                            !!errors.password
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        color="success"
                                    />
                                </div>
                                <div className={style.actions}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        className={style.button}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        onClick={handleGoogleLogin}
                                        className={style.button}
                                    >
                                        Sign in with Google
                                    </Button>
                                </div>
                                <div className={style.registerLink}>
                                    <Link to="/register">
                                        Don't have an account? Register here
                                    </Link>
                                </div>
                            </section>
                        </form>
                    );
                }}
            </Formik>
            {error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default Login;
