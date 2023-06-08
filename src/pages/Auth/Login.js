import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/Modal/ErrorMessage";
import { AuthContext } from "../../store/auth-context";
import Overlay from '../../components/Modal/Overlay'

import classes from "./Login.module.css";

const Login = () => {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate()
  const { login, setLoginHasError, loginHasError } = useContext(AuthContext)

  const closeModalHandler = () => {
    setLoginHasError(false)
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const emailCurrentValue = email.current.value;
    const passwordCurrentValue = password.current.value;

    if (!emailCurrentValue.includes("@")) return;
    if (emailCurrentValue.trim().length === 0 || passwordCurrentValue.trim().length === 0) return;
    login(emailCurrentValue, passwordCurrentValue)
  };

  useEffect(() => {
    if (!!localStorage.getItem('authTokens')) navigate('/home') // Logged in users don't have access to login page
  }, [])
  
  return (
    <div className={classes["page-container"]}>
      <Overlay onOverlayClick={closeModalHandler} isVisible={loginHasError} />
      {loginHasError && <ErrorMessage errorMessage="Username or password is wrong" onClose={closeModalHandler} />}
      <div className={classes["form-container"]}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
        <i style={{cursor:'pointer'}} className="fa fa-chevron-left" onClick={() => navigate(-1)}></i>
          <h1>Sign in to Twitter clone</h1>
          <input type="email" placeholder="Your email..." ref={email} autoComplete='on' />
          <input
            type="password"
            placeholder="Your password..."
            ref={password}
            autoComplete='on'
          />
          <p id={classes['not-have-account']}>Don't have an account? <Link to='/signup'>Sign up</Link></p>
          <p id={classes['not-have-account']}>Don't have an account? <a href='/'>Enter as a guest</a></p>
          <button type="submit" className="btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
