import React, { useState, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import SmallScreenNav from "./components/Modal/SmallScreenNav";
import Overlay from "./components/Modal/Overlay";
import { AuthContextProvider } from "./store/auth-context";
import Spinner from "./components/Spinner";
import EditProfilePage from "./pages/EditProfilePage";
import AddTweetOverlay from "./components/Tweet/AddTweetOverlay";

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

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const showAddTweetHandler = () => setIsAddTweetVisible(true);
  const closeAddTweetHandler = () => setIsAddTweetVisible(false);
  const [refreshHomePageOnAuthChange, setRefreshHomePageOnAuthChange] = useState(null)

  const closeMenuHandler = () => setIsMenuOpen(false);

  return (
    <AuthContextProvider>
      <Router>
        <Overlay
          isVisible={isAddTweetVisible}
          onOverlayClick={closeAddTweetHandler}
        />
        <Navigation onAddTweetFormClick={showAddTweetHandler} setRefreshHomePageOnAuthChange={setRefreshHomePageOnAuthChange} />
        {isAddTweetVisible && <AddTweetOverlay closeAddTweetHandler={closeAddTweetHandler} />}
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="home"
              element={
                <HomePage pageName="Home" onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} refreshHomePageOnAuthChange={refreshHomePageOnAuthChange} />
              }
            />
            <Route
              path="/"
              element={
                shouldRedirect ? <Navigate replace to="/login" /> : <Login onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />
              }
            />
            <Route
              path="explore"
              element={
                <Explore pageName="Explore" onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />
              }
            />
            <Route
              path="bookmarks"
              element={<Bookmarks pageName="Bookmarks" onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />}
            />
            {
              <Route
                path="login"
                element={
                  !isLoggedIn ? <Login /> : <Navigate replace to="/home" />
                }
              />
            }
            <Route path="signup" element={<Signup onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />} />
            <Route
              path="tweets/:tweetId"
              element={<TweetDetailPage onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />}
            />
            <Route path=":username" element={<Profile pageName="Profile" onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />} />
            <Route
              path="edit/:username"
              element={
                <EditProfilePage
                  pageName="Edit Profile"
                  onMenuClick={clickMenuHandler}
                  isMenuOpen={isMenuOpen}
                />
              }
            />
            <Route path=":username/followers" element={<UserFollowers onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />} />
            <Route path=":username/followings" element={<UserFollowings onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />} />
            <Route path="*" element={<NoMatch onMenuClick={clickMenuHandler} isMenuOpen={isMenuOpen} />} />
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
