import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import loginClasses from "./Login.module.css";
import axios from "axios";

const Signup = () => {
  // const [enteredFirstname, setEnteredFirstname] = useState("");
  // const [enteredLastname, setEnteredLastname] = useState("");
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  // const [firstnameTouched, setFirstnameTouched] = useState(false);
  // const [lastnameTouched, setLastnameTouched] = useState(false);
  // const [emailTouched, setEmailTouched] = useState(false);
  // const [usernameTouched, setUsernameTouched] = useState(false);
  // const [passwordTouched, setPasswordTouched] = useState(false);

  // const [formIsValid, setFormIsValid] = useState(false);

  // let message = null;

  // const firstnameChangeHandler = (e) => {
  //   setEnteredFirstname(e.target.value);
  //   if (!enteredFirstname.trim().length > 0 && firstnameTouched) {
  //     message = "Please provide a first name";

  //     return;
  //   }
  // };

  // const lastnameChangeHandler = (e) => {
  //   setEnteredLastname(e.target.value);
  //   if (!enteredLastname.trim().length > 0 && lastnameTouched) {
  //     message = "Please provide a last name";
  //     return;
  //   }
  // };

  // const emailChangeHandler = (e) => {
  //   setEnteredEmail(e.target.value);
  //   if (!enteredEmail.trim().length > 0 && emailTouched) {
  //     message = "Email must not be empty";
  //     return;
  //   }

  //   if (
  //     enteredEmail.trim().length > 0 &&
  //     emailTouched &&
  //     !enteredEmail.includes("@")
  //   ) {
  //     message = "Make sure your email address is valid";
  //   }
  // };

  // const usernameChangeHandler = (e) => {
  //   setEnteredUsername(e.target.value);
  //   if (!enteredUsername.trim().length > 0 && usernameTouched) {
  //     message = "Please provide a username";
  //     return;
  //   }
  // };

  // const passwordChangeHandler = (e) => {
  //   setEnteredPassword(e.target.value);
  //   if (!enteredPassword.trim().length > 0 && passwordTouched) {
  //     message = "Please provide a password";
  //     return;
  //   }

  //   if (enteredPassword.trim().length < 8 && passwordTouched) {
  //     message = "Make sure your password is at least 8 characters";
  //     return;
  //   }
  // };

  // async function sendUserData(
  //   enteredEmail,
  //   enteredUsername,
  //   enteredFirstname,
  //   enteredLastname,
  //   enteredPassword
  // ) {
  //   await fetch("http://127.0.0.1:8000/api/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: enteredEmail,
  //       username: enteredUsername,
  //       firstname: enteredFirstname,
  //       lastname: enteredLastname,
  //       password: enteredPassword,
  //     }),
  //   }).then(res => res.json()).then(data => console.log(data))
  // }

  // const formSubmitHandler = (e) => {
  //   e.preventDefault();

  //   setFirstnameTouched(true);
  //   setLastnameTouched(true);
  //   setEmailTouched(true);
  //   setUsernameTouched(true);
  //   setPasswordTouched(true);

  //   if (
  //     enteredEmail.trim().length > 0 &&
  //     enteredEmail.includes("@") &&
  //     enteredPassword.trim().length > 7 &&
  //     enteredFirstname.trim().length > 0 &&
  //     enteredLastname.trim().length > 0 &&
  //     enteredUsername.trim().length > 0
  //   )
  //     setFormIsValid(true);
  //   if (formIsValid)
  //     sendUserData(
  //       enteredEmail,
  //       enteredUsername,
  //       enteredFirstname,
  //       enteredLastname,
  //       enteredPassword
  //     );
  // };

  const username = useRef("");
  const email = useRef("");
  const firstname = useRef("");
  const lastname = useRef("");
  const password = useRef("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const usernameValue = username.current.value;
    const emailValue = email.current.value;
    const firstnameValue = firstname.current.value;
    const lastnameValue = lastname.current.value;
    const passwordValue = password.current.value;

    if (
      !usernameValue.trim() ||
      !emailValue.trim() ||
      !firstnameValue.trim() ||
      !lastnameValue.trim() ||
      !passwordValue.trim()
    ) {
      setMessage("All the fields are required.");
    }

    if (!emailValue.includes("@")) {
      setMessage("Please enter a valid email.");
    }

    if (passwordValue.trim().length < 8) {
      setMessage("The password should be at least 8 characters.");
    }
        // if (!res)
        //   setMessage("A user with the same username or email already exists.");
        // if (res.status === 201)
        //   setMessage(
        //     "There was a netword error, make sure you are connected to the internet."
    //     //   );
    //   })
    //   .catch((err) => {
    //     setMessage(err.message);
    //   });
    // setMessage("");
    const sendData = async () => {
        await axios.post("http://127.0.0.1:8000/api/", {
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        firstname: firstnameValue,
        lastname: lastnameValue
      }).then(res => setMessage(res.message)).catch(err => console.log(err))
    }

    sendData()
  };

  return (
    <section className={loginClasses["page-container"]}>
      <div className={loginClasses["form-container"]}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          {message && (
            <div className={classes["message-container"]}>
              <p className={classes.message}>{message}</p>
            </div>
          )}
          <div className={classes["form-section"]}>
            <i style={{cursor:'pointer'}} className="fa fa-chevron-left" onClick={() => navigate(-1)}></i>
          </div>
          <div className={classes["form-section"]} id={classes["user-name"]}>
            <input
              type="text"
              name="firstname"
              placeholder="First name..."
              // onChange={firstnameChangeHandler}
              ref={firstname}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name..."
              // onChange={lastnameChangeHandler}
              ref={lastname}
            />
          </div>
          <div className={classes["form-section"]}>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              // onChange={emailChangeHandler}
              ref={email}
            />
          </div>
          <div className={classes["form-section"]}>
            <input
              type="text"
              name="username"
              placeholder="Username..."
              // onChange={usernameChangeHandler}
              ref={username}
            />
          </div>
          <div className={classes["form-section"]}>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              // onChange={passwordChangeHandler}
              ref={password}
            />
          </div>
          <div className={classes["form-section"]}>
            <button type="submit" className="btn">
              Next
            </button>
          </div>
          <div className={classes["form-section"]}>
            <p id={classes['already-have-account']}>Already have an account? <Link to='/login'>Sign in</Link></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
