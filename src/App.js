import React from 'react'
import './App.css';
import AddTweet from './components/Tweet/AddTweet';
import TweetList from './components/Tweet/TweetList';

function App() {
  return (
    <React.Fragment>
      <AddTweet />
      <TweetList />
    </React.Fragment>

  );
}

export default App;
