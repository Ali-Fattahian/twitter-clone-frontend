import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import classes from "./Login.module.css";

const Login = props => {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const emailCurrentValue = email.current.value;
    const passwordCurrentValue = password.current.value;

    if (!emailCurrentValue.includes("@")) return;
    if (emailCurrentValue.trim().length === 0 || passwordCurrentValue.trim().length === 0) return;

    axiosInstance
      .post("token/", {
        email: emailCurrentValue,
        password: passwordCurrentValue,
      })
      .then((res) => {
        localStorage.setItem("refresh_token", res.data.refresh);
        localStorage.setItem("access_token", res.data.access);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/", { replace: true });
        props.authStatus(true)
      });
  };

  return (
    <div className={classes["page-container"]}>
      <div className={classes["form-container"]} onSubmit={formSubmitHandler}>
        <form className={classes.form}>
          <h1>Sign in to Twitter clone</h1>
          <input type="email" placeholder="Your email..." ref={email} />
          <input
            type="password"
            placeholder="Your password..."
            ref={password}
          />
          <button type="submit" className="btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
