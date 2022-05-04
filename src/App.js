import React, { useEffect, useState, useRef } from "react";
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
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import axiosInstance from "./axios";

function App() {
  const DUMMY_SEARCH_RESULTS = [
    {
      id: "1",
      fullName: "Jeff Atwood",
      username: "codingHorror",
      profileImage: ProfilePicture,
      bio: "Indoor enthusiast. Co-founder of https://tIndoor enthusiast. Co-founder of https://t",
      profileLink: "https://something.com",
    },
    {
      id: "2",
      fullName: "Atri Tripathi",
      username: "AtriTripathi",
      profileImage: ProfilePicture,
      bio: "Android Developer @ SuperShare (httpAndroid Developer @ SuperShare (http",
      profileLink: "https://something.com",
    },
    {
      id: "3",
      fullName: "Stephan Colbert",
      username: "StephanAtHome",
      profileImage: ProfilePicture,
      bio: "Evie’s husband",
      profileLink: "https://something.com",
    },
    {
      id: "4",
      fullName: "Amy Schulbert",
      username: "amyschulbert",
      profileImage: ProfilePicture,
      bio: "2022 tour dates on sale now! Get tickets2022 tour dates on sale now! Get tickets",
      profileLink: "https://something.com",
    },
  ];

  const shouldRedirect = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddTweetVisible, setIsAddTweetVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const tweetContent = useRef("");

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const showAddTweetHandler = () => setIsAddTweetVisible(true);
  const closeAddTweetHandler = () => setIsAddTweetVisible(false);

  const closeMenuHandler = () => setIsMenuOpen(false);

  const authStatusChangeHandler = (bool) => {
    setIsAuth(bool);

    if (localStorage.getItem("access_token")) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    authStatusChangeHandler();
  }, []);

  const addTweetHandler = (e) => {
    e.preventDefault();

    if (isAuth) {
      if (tweetContent.current.value.trim().length > 0) {
        sendData();
      }
    }
  };

  async function sendData() {
    const response = await axiosInstance.post(
      "http://127.0.0.1:8000/api/compose/tweet",
      {
        content: tweetContent.current.value,
      }
    );

    if (response.status === 201) {
      console.log("success");
      tweetContent.current.value = "";
      return;
    }
    console.log(response);
  }

  return (
    <Router>
      <Overlay
        isVisible={isAddTweetVisible}
        onOverlayClick={closeAddTweetHandler}
      />
      <Navigation onAddTweetFormClick={showAddTweetHandler} />
      {isAddTweetVisible && (
        <div className="add-tweet__container">
          <form className="add-tweet" onSubmit={addTweetHandler}>
            <div className="add-tweet__section">
              <i onClick={closeAddTweetHandler} className="fa fa-close"></i>
            </div>
            <div className="add-tweet__section" id="add-tweet__input">
              <img src={ProfilePicture} alt="Default Profile" />
              <textarea
                name="tweet-content"
                placeholder="What's happening?"
                ref={tweetContent}
              />
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
          element={
            <HomePage
              isAuth={isAuth}
              searchResults={DUMMY_SEARCH_RESULTS}
              pageName="Home"
              onMenuClick={clickMenuHandler}
            />
          }
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
            <Explore
              pageName="Explore"
              onMenuClick={clickMenuHandler}
              searchResults={DUMMY_SEARCH_RESULTS}
            />
          }
        />
        <Route path="bookmarks" element={<Bookmarks pageName="Bookmarks" />} />
        <Route
          path="login"
          element={<Login authStatus={authStatusChangeHandler} />}
        />
        <Route path="signup" element={<Signup />} />
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
