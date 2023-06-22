import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import style from "./login.module.css";

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const handleRegister = () => {
    history.push("/register");
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithProvider(provider);
  };

  const signInWithProvider = async (provider) => {
    try {
      const authInstance = getAuth();
      await signInWithPopup(authInstance, provider);
      history.push("/menu");
    } catch (error) {
      setError("An error occurred during login");
    }
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
    // ... otros usuarios
  ];

  return (
    <div className={style.loginContainer}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validate={(values) => {
          let errors = {};

          // Validación Username
          if (!values.username) {
            errors.username = "Please enter your username";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.username)) {
            errors.username = "You only need to enter letters and spaces";
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
              user.username === values.username &&
              user.password === values.password
          );
          if (foundUser) {
            history.push("/menu");
          } else {
            setError("The user entered does not exist");
          }
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
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
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
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
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  color="success"
                />
              </div>
              <div className={style.actions}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  className={style.button}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleGoogleLogin}
                  className={style.button}
                >
                  Sign In with Google
                </Button>
              </div>
              <div className={style.registerLink}>
                <Link to="/register">Don't have an account? Register here</Link>
              </div>
            </section>
          </form>
        )}
      </Formik>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default Login;
