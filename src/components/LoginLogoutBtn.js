import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const LoginLogoutBtn = (props) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    axiosInstance.defaults.headers['Authorization'] = null
    props.setRefreshHomePageOnAuthChange(Date.now())
    navigate("/home");
  };
  return (
    <>
      {!!localStorage.getItem("access_token") ? (
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
