import React from "react";
import Searchbar from "../components/Searchbar";

const NoMatch = () => {
  return (
    <React.Fragment>
      <div className="main__middle-side">
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
