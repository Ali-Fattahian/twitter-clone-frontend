import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "../pages/EditProfilePage.module.css";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

const EditProfileForm = (props) => {
  let isUsernameValid;
  let isEmailValid;
  const [profilePicture, setProfilePicture] = useState(props.profile.picture);
  const [profileChanged, setProfileChanged] = useState(false);
  const navigate = useNavigate();

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
          if (value === props.profile.username) return true; // This username already exists, but it's ok in this case.
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
          if (value === props.profile.email) return true;
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

  const formSubmitHandler = async (values) => {
    const formData = new FormData();
    formData.append("picture", profilePicture);
    await axiosInstance
      .put(
        `profiles/${props.profile.username}`,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          bio: values.bio,
          email: values.email,
          username: values.username,
          picture: formData.get("picture"),
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res && res.status === 200) {
          navigate(`/edit/${values.username}`);
        }
      });
  };

  return (
    <Formik
      initialValues={{
        firstname: props.profile.firstname,
        lastname: props.profile.lastname,
        bio: props.profile.bio,
        profilePicture,
        backgroundImage: "",
        username: props.profile.username,
        email: props.profile.email,
      }}
      onSubmit={formSubmitHandler}
      validationSchema={EditProfileSchema}
    >
      {() => {
        return (
          <Form className={classes["form"]} encType="multipart/form-data">
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
                onChange={(e) => {
                  setProfileChanged(true);
                  setProfilePicture(e.target.files[0]);
                }}
              />
              <img
                src={
                  profileChanged
                    ? URL.createObjectURL(profilePicture)
                    : profilePicture
                }
                alt="Profile"
                className={classes["profile-picture"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="firstname" placeholder="First name..." />
              <ErrorMessage
                name="firstname"
                component="div"
                className={classes["err-msg"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="lastname" placeholder="Last name..." />
              <ErrorMessage
                name="lastname"
                component="div"
                className={classes["err-msg"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="textarea" name="bio" placeholder="Bio..." />
              <ErrorMessage
                name="bio"
                component="div"
                className={classes["err-msg"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="email" name="email" placeholder="Email..." />
              <ErrorMessage
                name="email"
                component="div"
                className={classes["err-msg"]}
              />
            </div>
            <div className={classes["form-section"]}>
              <Field type="text" name="username" placeholder="Username..." />
              <ErrorMessage
                name="username"
                component="div"
                className={classes["err-msg"]}
              />
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
