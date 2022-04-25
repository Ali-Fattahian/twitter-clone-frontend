import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddTweet from "./components/Tweet/AddTweet";
import TweetList from "./components/Tweet/TweetList";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Navigation />
      <AddTweet />
      <TweetList />
      <Profile />
    </Router>
  );
}

export default App;
