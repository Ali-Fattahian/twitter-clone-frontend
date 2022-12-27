import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const LoginLogoutBtn = (props) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const logoutHandler = () => logout();
  return (
    <>
      {!!localStorage.getItem("authTokens") ? (
        <i
          style={{
            display: "flex",
            gap: "1rem",
            cursor: "pointer",
            alignItems: "center",
          }}
          className="fa fa-sign-out"
          aria-hidden="true"
          onClick={logoutHandler}
          title="Log out"
        >
          {props.text && (
            <p style={{ fontSize: "1rem", fontWeight: "normal" }}>Log out</p>
          )}
        </i>
      ) : (
        <i
          style={{
            display: "flex",
            gap: "1rem",
            cursor: "pointer",
            alignItems: "center",
          }}
          className="fa fa-sign-in"
          aria-hidden="true"
          title="Log in page"
          onClick={() => navigate("/login")}
        >
          {props.text && (
            <p style={{ fontSize: "1rem", fontWeight: "normal" }}>Log in</p>
          )}
        </i>
      )}
    </>
  );
};

export default LoginLogoutBtn;
