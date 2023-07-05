import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createUsers, getAllUsers } from "../../redux/actions/actionsUsers";
import { TextField, Button, Box } from "@mui/material";
import { Formik } from "formik";
import style from "./login.module.css";
import { auth } from "../../firebase/config";

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
        <Box
            sx={{
                backgroundColor:'#fefee3',
                height:'92vh',
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}
        >
            <Formik
                initialValues={{
                    mail: "",
                    password: "",
                }}
                validate={(values) => {
                    let errors = {};

                    // Validación Username
                    if (!values.mail) {
                        errors.mail = "Please enter your email";
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
                        setError("username or password does not exist");
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
                                <Box
                                    sx={{marginTop:'10%'}}
                                >
                                    <h1>Welcome to our cafeteria!</h1>
                                </Box>
                                <Box
                                    sx={{
                                        height:'15%',
                                        display:'flex',
                                        marginTop:'10%'
                                    }}
                                >
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        sx={{marginTop:'10px'}}
                                        type="text"
                                        id="mail"
                                        name="mail"
                                        label="Mail"
                                        value={values.mail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.mail && !!errors.mail}
                                        helperText={touched.mail && errors.mail}
                                        color="success"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        height:'15%',
                                        display:'flex',
                                        
                                    }}
                                >
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        sx={{marginTop:'10px'}}
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
                                </Box>
                                <Box
                                    sx={{
                                        height:'25%',
                                        display:'flex',
                                        flexDirection:'column',
                                        alignItems:'center'
                                    }}
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        sx={{
                                            height:'25%',
                                            width:'70%',
                                            marginBottom:'5%'
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        onClick={handleGoogleLogin}
                                        sx={{
                                            height:'25%',
                                            width:'70%'
                                        }}
                                    >
                                        Sign in with Google
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        height:'10%',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        marginTop:'30%',
                                    }}
                                >
                                    <Link to="/register" className={style.link} >
                                        Don't have an account? Register here
                                    </Link>
                                </Box>
                            </section>
                        </form>
                    );
                }}
            </Formik>
            {error && <Box sx={{height:'3%', marginTop:'0.7%', border:'1px solid red', color:'red', width:'360px', borderRadius:'10px'}} >{error}</Box>}
        </Box>
    );
};

export default Login;
    