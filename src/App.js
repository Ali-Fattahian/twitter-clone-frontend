import React from "react";
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

function App() {
  const shouldRedirect = true;

  return (
    <Router>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route
          path="/"
          element={
            shouldRedirect ? <Navigate replace to="/home" /> : <HomePage />
          }
        />
        <Route path="explore" element={<Explore />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path=":username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
