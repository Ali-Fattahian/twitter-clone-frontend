import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

import classes from "./Login.module.css";

const Login = () => {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const emailCurrentValue = email.current.value;
    const passwordCurrentValue = password.current.value;

    if (!emailCurrentValue.includes("@")) return;
    if (emailCurrentValue.trim().length === 0 || passwordCurrentValue.trim().length === 0) return;

    login(emailCurrentValue, passwordCurrentValue)

    navigate("/home", { replace: true });
  };
  return (
    <div className={classes["page-container"]}>
      <div className={classes["form-container"]} onSubmit={formSubmitHandler}>
        <form className={classes.form}>
        <i style={{cursor:'pointer'}} className="fa fa-chevron-left" onClick={() => navigate(-1)}></i>
          <h1>Sign in to Twitter clone</h1>
          <input type="email" placeholder="Your email..." ref={email} />
          <input
            type="password"
            placeholder="Your password..."
            ref={password}
          />
          <p id={classes['not-have-account']}>Don't have an account? <Link to='/signup'>Sign up</Link></p>
          <p id={classes['not-have-account']}>Don't have an account? <a href='/home'>Enter as a guest</a></p>
          <button type="submit" className="btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
