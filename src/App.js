import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
import Profile from "./pages/ProfilePage";
import Bookmarks from "./pages/Bookmarks";
import Navigation from "./components/Navigation";
import SmallScreenNav from "./components/Modal/SmallScreenNav";
import ProfilePicture from "./components/Tweet/default_profile.png";
import Overlay from "./components/Modal/Overlay";

function App() {
  const shouldRedirect = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddTweetVisible, setIsAddTweetVisible] = useState(false);

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const showAddTweetHandler = () => setIsAddTweetVisible(true);
  const closeAddTweetHandler = () => setIsAddTweetVisible(false);

  const closeMenuHandler = () => setIsMenuOpen(false);
  return (
    <Router>
      <Overlay
        isVisible={isAddTweetVisible}
        onOverlayClick={closeAddTweetHandler}
      />
      <Navigation onAddTweetFormClick={showAddTweetHandler} />
      {isAddTweetVisible && (
        <div className="add-tweet__container">
          <form className="add-tweet">
            <div className="add-tweet__section">
              <i onClick={closeAddTweetHandler} className="fa fa-close"></i>
            </div>
            <div className="add-tweet__section" id="add-tweet__input">
              <img src={ProfilePicture} alt="Default Profile" />
              <textarea
                name="tweet-content"
                placeholder="What's happening?"
              />{" "}
            </div>
            <div className="add-tweet__section" id="add-tweet__btn">
              <button type="submit" className="btn">
                Tweet
              </button>
            </div>
          </form>
        </div>
      )}
      <Routes>
        <Route
          path="home"
          element={<HomePage pageName="Home" onMenuClick={clickMenuHandler} />}
        />
        <Route
          path="/"
          element={
            shouldRedirect ? <Navigate replace to="/home" /> : <HomePage />
          }
        />
        <Route
          path="explore"
          element={
            <Explore pageName="Explore" onMenuClick={clickMenuHandler} />
          }
        />
        <Route path="bookmarks" element={<Bookmarks pageName="Bookmarks" />} />
        <Route path=":username" element={<Profile pageName="Profile" />} />
      </Routes>
      <SmallScreenNav
        isMenuOpen={isMenuOpen}
        onCloseBtnClick={closeMenuHandler}
      />
    </Router>
  );
}

export default App;
