import React from "react";
import Searchbar from "../components/Searchbar";
import Overlay from "../components/Modal/Overlay";

const NoMatch = (props) => {
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
      <div className="main__middle-side">
        <div className="ham-menu__container">
          <div className="ham-menu__btn" onClick={props.onMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <p className="p-info--center">
          Hmm...this page doesn't exist. Try searching for something else.
        </p>
      </div>
      <div className="main__right-side">
        <Searchbar />
      </div>
    </React.Fragment>
  );
};

export default NoMatch;
