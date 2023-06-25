import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/actionsUsers";
import style from "./registerGmail.module.css";

const RegisterGmail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { user } = props.location.state;
  console.log(user);

  const handleUpdateUser = async (values) => {
    try {
      const updatedUser = {
        mail: user.mail,
        userName: values.username,
        password: values.password,
      };
      console.log(updatedUser);
      await dispatch(updateUser(updatedUser));
      history.push("/menu");
    } catch (error) {
      setError("An error occurred while updating the user");
    }
  };

  return (
    <div className={style.loginContainer}>
      <Formik
        initialValues={{
          username: user.userName,
          password: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.username) {
            errors.username = "Please enter your username";
          } 

          if (!values.password) {
            errors.password = "Please enter your password";
          } else if (values.password.length < 8 || values.password.length > 16) {
            errors.password = "Password must be between 8 and 16 characters";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          handleUpdateUser(values);
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
          <form onSubmit={handleSubmit} className={style.form}>
            <section className={style.content}>
              <h1 className={style.title}>Edit User:</h1>
              <div className={style.inputContainer}>
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
                  className={style.input}
                />
              </div>
              <div className={style.inputContainer}>
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
                  className={style.input}
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
                  Update User
                </Button>
              </div>
            </section>
          </form>
        )}
      </Formik>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default RegisterGmail;
