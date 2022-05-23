import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import classes from "./Signup.module.css";
import loginClasses from "./Login.module.css";
import axios from "axios";
import Ovelay from "../../components/Modal/Overlay";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null)
  let isEmailValid;
  let isUsernameValid;

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .max(50, "Too long!")
      .required("First name is required"),
    lastname: Yup.string()
      .max(50, "Too long!")
      .required("Last name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test(
        "checkDupEmail",
        "A user with this email already exists",
        async (value) => {
          await fetch("http://127.0.0.1:8000/api/check-email/", {
            method: "POST",
            body: JSON.stringify({
              email: value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              isUsernameValid = data !== true;
            });
          return isUsernameValid;
        }
      ),
    username: Yup.string()
      .required("Username is required")
      .test(
        "checkDupUsername",
        "A user with this username already exists",
        async (value) => {
          await fetch("http://127.0.0.1:8000/api/check-username/", {
            method: "POST",
            body: JSON.stringify({
              username: value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              isEmailValid = data !== true;
            });
          return isEmailValid;
        }
      ),
  });

  const formSubmitHandler = (props) => {
    const sendData = async () => {
      await axios
        .post("http://127.0.0.1:8000/api/", {
          email: props.email,
          username: props.username,
          password: props.password,
          firstname: props.firstname,
          lastname: props.lastname,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            setMessage(
              "Your account was created, we've sent a confirmation email to you, make sure to check spam folder if you can't find it.\nThe link will expire in 10 minutes."
            );
          } else if (res.status === 400) {
            setMessage(res.response.data);
          }
        });
    };

    sendData();
  };

  return (
    <React.Fragment>
      {/* {!!message && hasStarted && !isLoading && <Ovelay />}
      {!!message && hasStarted && !isLoading && (
        <ErrorMessage errorMessage={message} onClose={messageCloseHandler} />
      )} */}
      <section className={loginClasses["page-container"]}>
        <div className={loginClasses["form-container"]}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              username: "",
            }}
            onSubmit={formSubmitHandler}
            validationSchema={SignUpSchema}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <div className={classes["form-section"]}>
                  <i
                    style={{ cursor: "pointer", color: "#000" }}
                    className="fa fa-chevron-left"
                    onClick={() => navigate(-1)}
                  ></i>
                </div>
                <div
                  className={classes["form-section"]}
                  id={classes["user-name"]}
                >
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="First name..."
                  />
                  <ErrorMessage name="firstname" />
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Last name..."
                  />
                  <ErrorMessage name="lastname" />
                </div>
                <div className={classes["form-section"]}>
                  <Field type="email" name="email" placeholder="Email..." />
                  <ErrorMessage name="email" />
                </div>
                <div className={classes["form-section"]}>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username..."
                  />
                  <ErrorMessage name="username" />
                </div>
                <div className={classes["form-section"]}>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password..."
                  />
                  <ErrorMessage name="password" />
                </div>
                <div className={classes["form-section"]}>
                  <button
                    type="submit"
                    className="btn"
                    disabled={!SignUpSchema.isValid}
                  >
                    Next
                  </button>
                </div>
                <div className={classes["form-section"]}>
                  <p id={classes["already-have-account"]}>
                    Already have an account? <Link to="/login">Sign in</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Signup;
