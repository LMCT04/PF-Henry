import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, getAllUsers } from "../../redux/actions/actionsUsers";
import { auth } from "../../firebase/config";
import style from "./register.module.css";

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const users = useSelector((state) => state.user);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    console.log(users);

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
                alert("An account with this email already exists");
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
                window.localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(newUser)
                );
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
                display:'center',
                justifyContent:'center',
            }}
        >
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    email: "",
                    address: "",
                }}
                validate={(values) => {
                    let errors = {};

                    if (!values.username) {
                        errors.username = "Please enter your username";
                    }

                    if (!values.password) {
                        errors.password = "Please enter your password";
                    } else if (
                        !/^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/.test(values.password)
                    ) {
                        errors.password =
                            "Password must be 8 to 15 characters long and contain at least one letter and one number";
                    }

                    if (!values.email) {
                        errors.email = "Please enter your email";
                    } else if (
                        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                            values.email
                        )
                    ) {
                        errors.email = "Please enter a valid email address";
                    }

                    if (!values.address) {
                        errors.address = "Please enter your address";
                    }

                    return errors;
                }}
                onSubmit={handleRegister}
            >
                {({
                    handleSubmit,
                    values,
                    handleChange,
                    handleBlur,
                    errors,
                    touched,
                }) => (
                    <form onSubmit={handleSubmit} className={style.formContainer}>
                        <section className={style.content}>
                            <Box
                            sx={{color:'#fefee3'}}
                            >
                                <h2>Register now!</h2>
                            </Box>
                            <Box
                                sx={{
                                    height:'14%',
                                    display:'flex',
                                }}
                            >
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
                                    sx={{marginTop:'3%'}}
                                />
                            </Box>
                            <Box
                                sx={{
                                    height:'14%',
                                    display:'flex',
                                }}
                            >
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
                                    sx={{marginTop:'3%'}}
                                />
                            </Box>
                            <Box
                                sx={{
                                    height:'14%',
                                    display:'flex',
                                }}
                            >
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    color="success"
                                    sx={{marginTop:'3%'}}
                                />
                            </Box>
                            <Box
                                sx={{
                                    height:'14%',
                                    display:'flex',
                                }}
                            >
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
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
                                    color="success"
                                    sx={{marginTop:'3%'}}
                                />
                            </Box>
                            <Box className={style.actions}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    sx={{width:'60%', height:'45%'}}
                                >
                                    Register
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    onClick={handleGoogleLogin}
                                    sx={{width:'60%', marginTop:'5%', height:'45%'}}
                                >
                                    Register with Google
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
                                <Link to="/login" className={style.link} >
                                    Already have an account? Login here
                                </Link>
                            </Box>
                        </section>
                    </form>
                )}
            </Formik>
            {error && <Box sx={{height:'3%', marginTop:'0.7%', border:'1px solid red', color:'red', width:'360px', borderRadius:'10px'}} >{error}</Box>}
        </Box>
    );
};

export default Register;
