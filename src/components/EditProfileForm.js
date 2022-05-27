import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import classes from "../pages/EditProfilePage.module.css";

const EditProfileForm = (props) => {
  let isUsernameValid;
  let isEmailValid;

  const EditProfileSchema = Yup.object().shape({
    firstname: Yup.string()
      .max(50, "Too long!")
      .required("First name is required"),
    lastname: Yup.string()
      .max(50, "Too long!")
      .required("Last name is required"),
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
              isUsernameValid = data !== true;
            });
          return isUsernameValid;
        }
      ),
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
              isEmailValid = data !== true;
            });
          return isEmailValid;
        }
      ),
    bio: Yup.string().max(300, "Too Long!"),
  });
  return (
    <Formik
      initialValues={{
        firstname: props.profile.firstname,
        lastname: props.profile.lastname,
        bio: props.profile.bio,
        profilePicture: props.profile.picture,
        backgroundImage: "",
        username: props.profile.username,
        email: props.profile.email,
      }}
      validationSchema={EditProfileSchema}
    >
      {() => {
        return (
          <Form className={classes["form"]}>
            <div
              className={classes["form-section"]}
              id={classes["background-image__container"]}
            >
              <label
                htmlFor={classes["background-image-accept"]}
                className={classes["background-image__label"]}
              >
                <i className="fa fa-camera"></i>
              </label>
              <input
                id={classes["background-image-accept"]}
                type="file"
                multiple
                accept="image/*"
              />
              {props.profile.background_img ? (
                <img src={props.profile.background_img} alt="Background" />
              ) : (
                <div className={classes["background-image-empty"]}></div>
              )}
            </div>
            <div
              className={`${classes["form-section"]} ${classes["profile-picture__container"]}`}
            >
              <label
                htmlFor={classes["profile-picture-accept"]}
                className={classes["profile-picture__label"]}
              >
                <i className="fa fa-camera"></i>
              </label>
              <input
                id={classes["profile-picture-accept"]}
                type="file"
                multiple
                accept="image/*"
              />
              <img
                src={props.profile.picture}
                alt="Profile"
                className={classes["profile-picture"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="firstname" placeholder="First name..." />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="lastname" placeholder="Last name..." />
            </div>
            <div className={classes["form-section"]}>
              <Field type="textarea" name="bio" placeholder="Bio..." />
            </div>
            <div className={classes["form-section"]}>
              <Field type="email" name="email" placeholder="Email..." />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="username" placeholder="Username..." />
            </div>
            <div
              className={classes["form-section"]}
              style={{ display: "block" }}
            >
              <div className={classes.btns}>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#fefefe",
                    color: "#0f1419",
                    border: "1px solid #0f1419",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ color: "#fefefe", backgroundColor: "#0f1419" }}
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProfileForm;
