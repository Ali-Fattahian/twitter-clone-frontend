import React, { useState, Suspense } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import SmallScreenNav from "./components/Modal/SmallScreenNav";
import Overlay from "./components/Modal/Overlay";
import { AuthContextProvider } from "./store/auth-context";
import Spinner from "./components/Spinner";
import EditProfilePage from "./pages/EditProfilePage";
import AddTweetOverlay from "./components/Tweet/AddTweetOverlay";
import { ServerContextProvider } from "./store/server-context";
import PrivateRoute from "./PrivateRoute";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Explore = React.lazy(() => import("./pages/Explore"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const Bookmarks = React.lazy(() => import("./pages/Bookmarks"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
const ActivateAccount = React.lazy(() =>
  import("./pages/Auth/ActivateAccountPage")
);
const TweetDetailPage = React.lazy(() => import("./pages/TweetDetailPage"));
const UserFollowers = React.lazy(() => import("./pages/UserFollowers"));
const UserFollowings = React.lazy(() => import("./pages/UserFollowings"));
const NoMatch = React.lazy(() => import("./pages/NoMatch"));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddTweetVisible, setIsAddTweetVisible] = useState(false);

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const showAddTweetHandler = () => setIsAddTweetVisible(true);
  const closeAddTweetHandler = () => setIsAddTweetVisible(false);

  const closeMenuHandler = () => setIsMenuOpen(false);

  return (
    <>
      <AuthContextProvider>
        <ServerContextProvider>
          <Router>
            <Overlay
              isVisible={isAddTweetVisible}
              onOverlayClick={closeAddTweetHandler}
            />
            <Navigation onAddTweetFormClick={showAddTweetHandler} />
            {isAddTweetVisible && (
              <AddTweetOverlay closeAddTweetHandler={closeAddTweetHandler} />
            )}
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      pageName="Home"
                      onMenuClick={clickMenuHandler}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  }
                />
                <Route
                  path="explore"
                  element={
                    <Explore
                      pageName="Explore"
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route
                  path="bookmarks"
                  element={
                    <Bookmarks
                      pageName="Bookmarks"
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route path="login" element={<Login />} />
                <Route
                  path="signup"
                  element={
                    <Signup
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route path="activate-account/:token" element={<ActivateAccount />} />
                <Route
                  path="tweets/:tweetId"
                  element={
                    <TweetDetailPage
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route
                  path="get-profile/:username"
                  element={
                    <ProfilePage
                      pageName="Profile"
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route
                  path="edit/:username"
                  element={
                    <PrivateRoute>
                      <EditProfilePage
                        pageName="Edit Profile"
                        onMenuClick={clickMenuHandler}
                        isMenuOpen={isMenuOpen}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path=":username/followers"
                  element={
                    <UserFollowers
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route
                  path=":username/followings"
                  element={
                    <UserFollowings
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
                <Route
                  path="*"
                  element={
                    <NoMatch
                      onMenuClick={clickMenuHandler}
                      isMenuOpen={isMenuOpen}
                    />
                  }
                />
              </Routes>
            </Suspense>
            <SmallScreenNav
              isMenuOpen={isMenuOpen}
              onCloseBtnClick={closeMenuHandler}
            />
          </Router>
        </ServerContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
