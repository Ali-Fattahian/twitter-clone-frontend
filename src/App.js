import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddTweet from "./components/Tweet/AddTweet";
import TweetList from "./components/Tweet/TweetList";
import Profile from "./components/Profile";
import HomePage from "./pages/HomePage";

function App() {
  const shouldRedirect = true;

  return (
    <Router>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route
          path="/"
          element={shouldRedirect ? <Navigate replace to="/home" /> : <HomePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
