import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";

const LoginLogoutBtn = (props) => {
  const navigate = useNavigate();
  const api = useAxios()
  const logoutHandler = () => {
    localStorage.clear();
    api.defaults.headers['Authorization'] = null
    props.setRefreshHomePageOnAuthChange(Date.now())
    navigate("/home");
  };
  return (
    <>
      {!!localStorage.getItem("authTokens") ? (
        <i
          style={{ display: "flex", gap: "1rem", cursor: "pointer", alignItems: "center" }}
          className="fa fa-sign-out"
          aria-hidden="true"
          onClick={logoutHandler}
          title="Log out"
        >
          {props.text && <p style={{fontSize: "1rem", fontWeight: "normal"}}>Log out</p>}
        </i>
      ) : (
        <i
          style={{ display: "flex", gap: "1rem", cursor: "pointer", alignItems: "center" }}
          className="fa fa-sign-in"
          aria-hidden="true"
          title="Log in page"
          onClick={() => navigate("/login")}
        >
          {props.text && (
            <p style={{fontSize: "1rem", fontWeight: "normal"}}>Log in</p>
          )}
        </i>
      )}
    </>
  );
};

export default LoginLogoutBtn;
