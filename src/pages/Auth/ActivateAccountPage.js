import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { ServerContext } from "../../store/server-context";

const ActivateAccountPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [message, setMessage] = useState(null);
  const { serverURL } = useContext(ServerContext);

  const sendVerificationData = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverURL}/verify-email?token=${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Successfully activated");
        setRedirectLogin(true);
      } else {
        setMessage("Credentials were invalid, Please try again");
        setRedirectLogin(false);
      }
      setLoading(false);
    } catch {
      setMessage(
        "There was an error processing your request,\
            Make sure you have a stable internet connection and try again."
      );
      setRedirectLogin(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    sendVerificationData(token);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {loading && <p style={{ color: "#ddd" }}>Please wait ...</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {redirectLogin && (
        <a href="/login" className="btn">
          Login
        </a>
      )}
    </div>
  );
};

export default ActivateAccountPage;
