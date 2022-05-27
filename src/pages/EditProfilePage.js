import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./EditProfilePage.module.css";
import EditProfileForm from "../components/EditProfileForm";
import Searchbar from "../components/Searchbar";
import axiosInstance from '../axios';

const EditProfilePage = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [profile, setProfile] = useState(null)
  const { username } = useParams()

  const getProfile = useCallback(async () => {
    setIsLoading(true)
    setHasStarted(true)
    await axiosInstance.get(`profiles/${username}`).then(res => {
      if (res.status === 200) {
        setProfile(res.data)
      } else {
        setErrorMessage("Sorry this page doesn't exist.")
        setHasError(true)
      }
    })
    setIsLoading(false)
  }, [username])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
    <React.Fragment>
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          {/* <img src={ProfilePicture} alt="Profile" onClick={props.onMenuClick} /> */}
          <p>{props.pageName}</p>
        </section>
        <section className={classes["edit-profile"]}>
            <div className={classes['form-container']}>
              {hasStarted && !isLoading && !hasError && <EditProfileForm profile={profile} />}
              {hasStarted && !isLoading && hasError && <p>{errorMessage}</p>}
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
