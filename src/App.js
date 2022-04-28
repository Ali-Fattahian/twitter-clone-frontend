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

function App() {
  const shouldRedirect = true;

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const clickMenuHandler = () => {
    setIsMenuOpen((prevState) =>  !prevState)
  }

  const closeMenuHandler = () => setIsMenuOpen(false)
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="home" element={<HomePage pageName='Home' onMenuClick={clickMenuHandler} />} />
        <Route
          path="/"
          element={
            shouldRedirect ? <Navigate replace to="/home" /> : <HomePage />
          }
        />
        <Route path="explore" element={<Explore pageName='Explore' onMenuClick={clickMenuHandler} />} />
        <Route path="bookmarks" element={<Bookmarks pageName='Bookmarks' />} />
        <Route path=":username" element={<Profile pageName='Profile' />} />
      </Routes>
      <SmallScreenNav isMenuOpen={isMenuOpen} onCloseBtnClick={closeMenuHandler} />
    </Router>
  );
}

export default App;
