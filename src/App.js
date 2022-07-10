import React, { useState, useRef, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import SmallScreenNav from "./components/Modal/SmallScreenNav";
import ProfilePicture from "./components/Tweet/default_profile.png";
import Overlay from "./components/Modal/Overlay";
import axiosInstance from "./axios";
import { AuthContextProvider } from "./store/auth-context";
import Spinner from "./components/Spinner";
import EditProfilePage from "./pages/EditProfilePage";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Explore = React.lazy(() => import("./pages/Explore"));
const Profile = React.lazy(() => import("./pages/ProfilePage"));
const Bookmarks = React.lazy(() => import("./pages/Bookmarks"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
const TweetDetailPage = React.lazy(() => import("./pages/TweetDetailPage"));
const UserFollowers = React.lazy(() => import("./pages/UserFollowers"));
const UserFollowings = React.lazy(() => import("./pages/UserFollowings"));
const NoMatch = React.lazy(() => import("./pages/NoMatch"));

function App() {
  const shouldRedirect = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddTweetVisible, setIsAddTweetVisible] = useState(false);
  const isLoggedIn = !!localStorage.getItem("access_token");
  const tweetContent = useRef("");

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const showAddTweetHandler = () => setIsAddTweetVisible(true);
  const closeAddTweetHandler = () => setIsAddTweetVisible(false);

  const closeMenuHandler = () => setIsMenuOpen(false);

  const addTweetHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
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
    <AuthContextProvider>
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
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="home"
              element={
                <HomePage pageName="Home" onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />
              }
            />
            <Route
              path="/"
              element={
                shouldRedirect ? <Navigate replace to="/login" /> : <Login />
              }
            />
            <Route
              path="explore"
              element={
                <Explore pageName="Explore" onMenuClick={clickMenuHandler} />
              }
            />
            <Route
              path="bookmarks"
              element={<Bookmarks pageName="Bookmarks" />}
            />
            {
              <Route
                path="login"
                element={
                  !isLoggedIn ? <Login /> : <Navigate replace to="/home" />
                }
              />
            }
            <Route path="signup" element={<Signup />} />
            <Route
              path="tweets/:tweetId"
              element={<TweetDetailPage pageName="Tweet" />}
            />
            <Route path=":username" element={<Profile pageName="Profile" />} />
            <Route
              path="edit/:username"
              element={
                <EditProfilePage
                  pageName="Edit Profile"
                  onMenuClick={clickMenuHandler}
                />
              }
            />
            <Route path=":username/followers" element={<UserFollowers />} />
            <Route path=":username/following" element={<UserFollowings />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
        <SmallScreenNav
          isMenuOpen={isMenuOpen}
          onCloseBtnClick={closeMenuHandler}
        />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
