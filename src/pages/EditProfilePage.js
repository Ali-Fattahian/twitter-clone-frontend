import React, { useContext } from "react";
import classes from "./EditProfilePage.module.css";
import EditProfileForm from "../components/EditProfileForm";
import Searchbar from "../components/Searchbar";
import Overlay from "../components/Modal/Overlay";
import { AuthContext } from "../store/auth-context";

const EditProfilePage = (props) => {
  const { userData } = useContext(AuthContext);

  const onOverlayClick = () => {
    props.onMenuClick();
  };

  return (
    <React.Fragment>
      {!!props.isMenuOpen ? (
        <Overlay onOverlayClick={onOverlayClick} isVisible={true} />
      ) : (
        <Overlay onOverlayClick={onOverlayClick} isVisible={false} />
      )}
      <div className="main__middle-side" id="homepage-middle">
        <section className="menu-btn__section">
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>{props.pageName}</p>
        </section>
        <section className={classes["edit-profile"]}>
          <div className={classes["form-container"]}>
            {(!!userData && <EditProfileForm profile={userData} />) || (
              <p className="p-info--center">Sorry this page doesn't exist.</p>
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
