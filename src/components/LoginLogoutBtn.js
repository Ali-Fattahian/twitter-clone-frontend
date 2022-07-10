import { useNavigate } from "react-router-dom";

const LoginLogoutBtn = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {!!localStorage.getItem("access_token") ? (
        <i
          style={{ display: "flex", gap: "1rem" }}
          class="fa fa-sign-out"
          aria-hidden="true"
          onClick={() => localStorage.clear()}
        >
          {props.text && <p style={{fontWeight: '500'}}>Log out</p>}
        </i>
      ) : (
        <i
          style={{ display: "flex", gap: "1rem" }}
          class="fa fa-sign-in"
          aria-hidden="true"
          onClick={() => navigate("/login")}
        >
          {props.text && <p style={{fontWeight: '500'}}>Log in</p>}
        </i>
      )}
    </>
  );
};

export default LoginLogoutBtn;
