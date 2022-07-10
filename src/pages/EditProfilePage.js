import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./EditProfilePage.module.css";
import EditProfileForm from "../components/EditProfileForm";
import Searchbar from "../components/Searchbar";
import axiosInstance from "../axios";
import { parseJwt } from "../utils";

const EditProfilePage = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    setHasStarted(true);
    await axiosInstance.get(`profiles/${username}`).then((res) => {
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        setHasError(true);
      }
    });
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    if (!!localStorage.getItem("access_token")) {
      getProfile();
      if (profile) {
        const token = localStorage.getItem("access_token");
        const tokenId = parseJwt(token).user_id;
        if (tokenId !== profile.id) {
          navigate("/home");
        }
      }
    } else {
      navigate("/home");
    }
  }, [getProfile, navigate]);

  return (
    <React.Fragment>
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          {/* <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} /> */}
          <p>{props.pageName}</p>
        </section>
        <section className={classes["edit-profile"]}>
          <div className={classes["form-container"]}>
            {(hasStarted && !isLoading && !hasError && (
              <EditProfileForm
                profile={profile}
              />
            )) || (
              <p className="p-info--center">
                Sorry this page doesn't exist.
              </p>
            )}
          </div>
        </section>
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default EditProfilePage;
